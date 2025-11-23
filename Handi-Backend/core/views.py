from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from .serializers import RequestOTPSerializer, VerifyOTPSerializer

OTP_CODE = "1234"

class RequestOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RequestOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data["phone"].strip()
        user, created = CustomUser.objects.get_or_create(phone=phone)

        return Response({
            "detail": "OTP sent (mocked). Use 1234.",
            "created": created
        }, status=status.HTTP_200_OK)


class VerifyOTPView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        phone = serializer.validated_data["phone"].strip()
        otp = serializer.validated_data["otp"].strip()

        if otp != OTP_CODE:
            return Response({"detail": "Invalid OTP"}, status=400)

        user, _ = CustomUser.objects.get_or_create(phone=phone)

        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })
