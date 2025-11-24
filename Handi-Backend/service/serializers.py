from rest_framework import serializers
from .models import Profile, Wallet, ServiceRequest


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
