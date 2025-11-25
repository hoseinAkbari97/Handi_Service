from rest_framework import serializers
from .models import Profile, Wallet, ServiceRequest, RepresentativeTechnician
from django.utils import timezone
import random


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "id",
            "first_name",
            "last_name",
            "user_type",
            "expertise",
            "address",
            "city",
            "bio",
            "profile_picture",
            "point",
        ]
        read_only_fields = ("point", "user_type")


class TechnicianSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="user.phone", read_only=True)
    rate = serializers.FloatField(default=4.5)

    class Meta:
        model = Profile
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone",
            "expertise",       
            "city",
            "bio",
            "profile_picture",
            "point",
            "rate",
        ]


class ActiveRequestSerializer(serializers.ModelSerializer):
    technician = TechnicianSerializer(read_only=True)

    class Meta:
        model = ServiceRequest
        fields = ["id", "title", "description", "cost", "status", "technician"]


class CustomerPanelSerializer(serializers.Serializer):
    total_requests = serializers.IntegerField()
    completed_requests = serializers.IntegerField()
    wallet_balance = serializers.IntegerField()
    active_request = ActiveRequestSerializer(allow_null=True)
    top_technicians = TechnicianSerializer(many=True)
    profile = ProfileSerializer()


class RecentRequestSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    customer_profile_picture = serializers.SerializerMethodField()
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequest
        fields = ["id", "title", "customer_name", "customer_profile_picture", "time_ago"]

    def get_customer_name(self, obj):
        return f"{obj.customer.first_name or ''} {obj.customer.last_name or ''}".strip()

    def get_customer_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.customer.profile_picture:
            return request.build_absolute_uri(obj.customer.profile_picture.url)
        return None

    def get_time_ago(self, obj):
        from django.utils.timesince import timesince
        return timesince(obj.created_at)


class TechnicianPanelSerializer(serializers.Serializer):
    completed_jobs = serializers.IntegerField()
    monthly_income = serializers.IntegerField()
    average_rating = serializers.FloatField()
    average_response_time = serializers.IntegerField()
    recent_requests = RecentRequestSerializer(many=True)
    profile = ProfileSerializer()


class RepresentativePanelSerializer(serializers.Serializer):
    active_jobs_today = serializers.IntegerField()
    team_size = serializers.IntegerField()
    monthly_income = serializers.IntegerField()
    team_average_rating = serializers.FloatField()
    recent_team_requests = RecentRequestSerializer(many=True)
    profile = ProfileSerializer()
    technicians = TechnicianSerializer(many=True)


class RepresentativeTechnicianFullSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(source="user.phone", read_only=True)
    rate = serializers.FloatField(default=4.5)
    status = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = [
            "id",
            "first_name",
            "last_name",
            "phone",
            "expertise",
            "city",
            "bio",
            "profile_picture",
            "point",
            "rate",
            "status",
        ]

    def get_status(self, obj):
        """
        Dummy logic for now:
        - If has an active request → "working"
        - Else always: "ready"
        """
        has_active = obj.assigned_requests.filter(
            status__in=["pending", "assigned", "in_progress"]
        ).exists()

        return "working" if has_active else "ready"
    

class TechnicianEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "first_name",
            "last_name",
            "expertise",
            "city",
            "bio",
            "profile_picture",
            "point",
        ]


class RepresentativeTaskSerializer(serializers.ModelSerializer):
    customer_name = serializers.SerializerMethodField()
    customer_phone = serializers.CharField(source="customer.user.phone", read_only=True)

    technician_name = serializers.SerializerMethodField()
    technician_phone = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequest
        fields = [
            "id",
            "title",
            "description",
            "status",
            "cost",
            "created_at",
            "updated_at",

            # customer info
            "customer_name",
            "customer_phone",

            # technician info
            "technician_name",
            "technician_phone",
        ]

    def get_customer_name(self, obj):
        return f"{obj.customer.first_name or ''} {obj.customer.last_name or ''}".strip()

    def get_technician_name(self, obj):
        if not obj.technician:
            return None
        return f"{obj.technician.first_name or ''} {obj.technician.last_name or ''}".strip()

    def get_technician_phone(self, obj):
        if not obj.technician:
            return None
        return obj.technician.user.phone


class AssignTechnicianSerializer(serializers.Serializer):
    technician_id = serializers.IntegerField()

    def validate(self, data):
        technician_id = data.get("technician_id")
        request_obj = self.context.get("request_obj")
        representative = self.context.get("representative")

        # Check if technician belongs to representative
        tech = Profile.objects.filter(
            id=technician_id,
            user_type="technician",
            representative_links__representative=representative
        ).first()

        if not tech:
            raise serializers.ValidationError("Technician does not belong to your team.")

        data["technician"] = tech
        return data

    def save(self):
        request_obj = self.context["request_obj"]
        technician = self.validated_data["technician"]

        request_obj.technician = technician
        request_obj.status = "assigned"
        request_obj.save()

        return request_obj
    

class RepresentativeTaskDetailSerializer(serializers.ModelSerializer):
    technician_name = serializers.SerializerMethodField()
    customer_name = serializers.SerializerMethodField()
    score = serializers.SerializerMethodField()

    class Meta:
        model = ServiceRequest
        fields = [
            "id",
            "title",
            "cost",
            "status",
            "technician_name",
            "customer_name",
            "score",
            "created_at",
        ]

    def get_technician_name(self, obj):
        if obj.technician:
            return f"{obj.technician.first_name or ''} {obj.technician.last_name or ''}".strip()
        return "No Technician"

    def get_customer_name(self, obj):
        return f"{obj.customer.first_name or ''} {obj.customer.last_name or ''}".strip()

    def get_customer_profile_picture(self, obj):
        request = self.context.get("request")
        if obj.customer.profile_picture:
            return request.build_absolute_uri(obj.customer.profile_picture.url)
        return None
    
    def get_score(self, obj):
        return random.randint(0, 100)


class RepresentativeReportSerializer(serializers.Serializer):
    total_income = serializers.IntegerField()
    total_tasks = serializers.IntegerField()
    avg_rating = serializers.FloatField()
    efficiency = serializers.FloatField()
    task_details = RepresentativeTaskDetailSerializer(many=True)


class RepresentativeEditSerializer(serializers.Serializer):

    # USER FIELDS
    phone = serializers.CharField(source="user.phone", read_only=True)

    # PROFILE FIELDS
    email = serializers.EmailField(required=False, allow_null=True)
    first_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    area = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    address = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    city = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    bio = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    profile_picture = serializers.ImageField(required=False)

    # EXTRA CALCULATED FIELDS
    experience = serializers.SerializerMethodField()
    total_requests = serializers.SerializerMethodField()
    technician_count = serializers.SerializerMethodField()

    def get_experience(self, profile):
        diff = timezone.now() - profile.user.date_joined
        return f"{diff.days} روز"

    def get_total_requests(self, profile):
        tech_ids = RepresentativeTechnician.objects.filter(
            representative=profile
        ).values_list("technician_id", flat=True)

        return ServiceRequest.objects.filter(
            technician_id__in=tech_ids,
            status="completed"
        ).count()

    def get_technician_count(self, profile):
        return RepresentativeTechnician.objects.filter(representative=profile).count()

    def update(self, instance, validated_data):
        # Update profile fields
        for field, value in validated_data.items():
            setattr(instance, field, value)

        instance.save()
        return instance
