from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile, ServiceRequest, Wallet
from .serializers import ProfileSerializer, CustomerPanelSerializer, ActiveRequestSerializer, TechnicianSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Create profile on the fly if missing
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile

class CustomerPanelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Ensure user is customer
        profile = request.user.profile
        if profile.user_type != "customer":
            return Response({"detail": "Only customers can access this panel."}, status=403)

        # Aggregate stats
        total_requests = ServiceRequest.objects.filter(customer=profile).count()
        completed_requests = ServiceRequest.objects.filter(customer=profile, status="completed").count()
        wallet_balance = getattr(profile.wallet, "balance", 0)

        # Find active (not completed or cancelled) request
        active_request = (
            ServiceRequest.objects
            .filter(customer=profile)
            .exclude(status__in=["completed", "cancelled"])
            .order_by("-created_at")
            .first()
        )

        # Dummy "top technicians" logic for now (you can later sort by rating)
        top_technicians = Profile.objects.filter(user_type="technician")[:3]

        data = {
            "total_requests": total_requests,
            "completed_requests": completed_requests,
            "wallet_balance": wallet_balance,
            "active_request": ActiveRequestSerializer(active_request).data if active_request else None,
            "top_technicians": TechnicianSerializer(top_technicians, many=True).data,
        }

        serializer = CustomerPanelSerializer(data)
        return Response(serializer.data)

