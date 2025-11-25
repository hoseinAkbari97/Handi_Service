from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile, ServiceRequest
from .serializers import (
    ProfileSerializer,
    CustomerPanelSerializer,
    ActiveRequestSerializer,  
    TechnicianSerializer,     
    TechnicianPanelSerializer,
    RecentRequestSerializer,
    RepresentativePanelSerializer,
    RepresentativeTechnicianFullSerializer,
    TechnicianEditSerializer,
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
    
class RepresentativePanelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        # Ensure user is representative
        if profile.user_type != "representative":
            return Response({"detail": "Only representatives can access this panel."}, status=403)

        # ---------------------------------------------------------
        # TECHNICIANS OF THIS REPRESENTATIVE
        # ---------------------------------------------------------
        technicians = Profile.objects.filter(
            representative_links__representative=profile
        )

        team_size = technicians.count()

        # ---------------------------------------------------------
        # ACTIVE JOBS OF TODAY (assigned to the representative's technicians)
        # ---------------------------------------------------------
        from django.utils.timezone import now
        today = now().date()

        active_jobs_today = ServiceRequest.objects.filter(
            technician__in=technicians,
            created_at__date=today
        ).exclude(status__in=["completed", "cancelled"]).count()

        # ---------------------------------------------------------
        # TEAM MONTHLY INCOME (dummy for now)
        # ---------------------------------------------------------
        monthly_income = 120000000   # Hardcoded value from your code

        # ---------------------------------------------------------
        # TEAM AVG RATING (dummy)
        # ---------------------------------------------------------
        team_average_rating = 4.5

        # ---------------------------------------------------------
        # RECENT TEAM REQUESTS (latest 3 among all technician requests)
        # ---------------------------------------------------------
        recent_requests = (
            ServiceRequest.objects.filter(technician__in=technicians)
            .order_by("-created_at")[:3]
        )

        # ---------------------------------------------------------
        # Pack into serializer
        # ---------------------------------------------------------
        data_to_serialize = {
            "active_jobs_today": active_jobs_today,
            "team_size": team_size,
            "monthly_income": monthly_income,
            "team_average_rating": team_average_rating,
            "recent_team_requests": recent_requests,   # objects
            "profile": profile,                        # representative profile
            "technicians": technicians,                # team
        }

        serializer = RepresentativePanelSerializer(
            instance=data_to_serialize,
            context={"request": request}
        )

        return Response(serializer.data)
    
class RepresentativeTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rep = request.user.profile

        if rep.user_type != "representative":
            return Response({"detail": "Only representatives can access this"}, status=403)

        technicians = Profile.objects.filter(
            user_type="technician",
            representative_links__representative=rep
        )

        serializer = RepresentativeTechnicianFullSerializer(
            technicians, many=True, context={"request": request}
        )

        return Response(serializer.data)
    
class RepresentativeEditTechnicianView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, technician_id):
        rep = request.user.profile

        # ensure the technician belongs to this representative
        technician = Profile.objects.filter(
            id=technician_id,
            user_type="technician",
            representative_links__representative=rep
        ).first()

        if not technician:
            return Response({"detail": "Technician not found in your team"}, status=404)

        serializer = TechnicianEditSerializer(
            technician, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Technician updated successfully"})
