from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RequestOTPSerializer, VerifyOTPSerializer
from .models import CustomUser
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

# OTP is mocked to '1234' for now.
OTP_CODE = "1234"


class RequestOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone'].strip()

        # Guarantee user exists (do not authenticate yet)
        user, created = CustomUser.objects.get_or_create(phone=phone)
        # In real system: generate OTP, send SMS here
        # For MVP, we just return success
        return Response({
            "detail": "OTP sent (stubbed). Use code 1234 for now.",
            "created": created
        }, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        phone = serializer.validated_data['phone'].strip()
        otp = serializer.validated_data['otp'].strip()

        if otp != OTP_CODE:
            return Response({"detail": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        # Safe ORM usage — prevent SQL injection implicitly by using ORM
        user = None
        try:
            user = CustomUser.objects.get(phone=phone)
        except CustomUser.DoesNotExist:
            # create user if missing (should typically be created at RequestOTP)
            user = CustomUser.objects.create_user(phone=phone)

        # Issue JWT tokens
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        refresh_token = str(refresh)

        user_data = {
            "id": user.id,
            "phone": user.phone,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }

        return Response({
            "access": access,
            "refresh": refresh_token,
            "user": user_data
        }, status=status.HTTP_200_OK)
