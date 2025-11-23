from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile, ServiceRequest
from .serializers import (
    ProfileSerializer,
    CustomerPanelSerializer,
    ActiveRequestSerializer,  # This wasn't used but might be needed by the serializer
    TechnicianSerializer,     # This wasn't used but might be needed by the serializer
    TechnicianPanelSerializer,
    RecentRequestSerializer,  # This wasn't used but might be needed by the serializer
)


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


class CustomerPanelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "customer":
            return Response({"detail": "Only customers can access this panel."}, status=403)

        total_requests = ServiceRequest.objects.filter(customer=profile).count()
        completed_requests = ServiceRequest.objects.filter(
            customer=profile, status="completed"
        ).count()

        # Use hasattr to safely access the related wallet
        wallet_balance = getattr(profile, 'wallet', None)
        wallet_balance = wallet_balance.balance if wallet_balance else 0


        active_request = (
            ServiceRequest.objects.filter(customer=profile)
            .exclude(status__in=["completed", "cancelled"])
            .order_by("-created_at")
            .first()
        )

        top_technicians = Profile.objects.filter(user_type="technician")[:3]

        # --- FIX ---
        # 1. Build a dictionary of the RAW objects and data,
        #    not the already-serialized .data
        data_to_serialize = {
            "total_requests": total_requests,
            "completed_requests": completed_requests,
            "wallet_balance": wallet_balance,
            "active_request": active_request,    # Pass the object
            "top_technicians": top_technicians, # Pass the QuerySet
            "profile": profile,                 # Pass the object
        }

        # 2. Pass the dictionary as the 'instance' to be serialized.
        # 3. Pass the 'request' in the context so nested serializers can use it.
        serializer = CustomerPanelSerializer(
            instance=data_to_serialize, 
            context={"request": request}
        )
        return Response(serializer.data)


class TechnicianPanelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "technician":
            return Response({"detail": "Only technicians can access this panel."}, status=403)

        completed_jobs = ServiceRequest.objects.filter(
            technician=profile, status="completed"
        ).count()

        recent_requests = (
            ServiceRequest.objects.filter(technician=profile)
            .order_by("-created_at")[:3]
        )

        # --- FIX ---
        # 1. Build a dictionary of the RAW objects and data
        data_to_serialize = {
            "completed_jobs": completed_jobs,
            "monthly_income": 4500000,  # Hardcoded value from your code
            "average_rating": 4.9,      # Hardcoded value from your code
            "average_response_time": 25, # Hardcoded value from your code
            "recent_requests": recent_requests, # Pass the QuerySet
            "profile": profile,                 # Pass the object
        }

        # 2. Pass the dictionary as the 'instance' to be serialized.
        # 3. Pass the 'request' in the context.
        serializer = TechnicianPanelSerializer(
            instance=data_to_serialize,
            context={"request": request}
        )
        return Response(serializer.data)