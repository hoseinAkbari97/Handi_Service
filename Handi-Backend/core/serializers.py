from rest_framework import serializers
from .models import CustomUser

class RequestOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)

class VerifyOTPSerializer(serializers.Serializer):
    phone = serializers.CharField(max_length=20)
    otp = serializers.CharField(max_length=10)
