from rest_framework import serializers
from .models import Profile, Wallet, ServiceRequest

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'user_type', 'address', 'city', 'bio', 'profile_picture', 'point']

class TechnicianSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.first_name", read_only=True)
    phone = serializers.CharField(source="user.phone", read_only=True)

    class Meta:
        model = Profile
        fields = ["id", "name", "phone", "city", "bio"]


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

    # Nest the full profile data
    profile = ProfileSerializer()
