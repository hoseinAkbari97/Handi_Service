from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile, ServiceRequest, RepresentativeTechnician
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
    RepresentativeTaskSerializer,
    AssignTechnicianSerializer,
    RepresentativeReportSerializer,
    RepresentativeTaskDetailSerializer,
    RepresentativeEditSerializer,
    ServiceRequestCreateSerializer,
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
    
class RepresentativeTaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rep = request.user.profile

        if rep.user_type != "representative":
            return Response({"detail": "Only representatives can access this."}, status=403)

        # All tasks where technician belongs to representative
        technician_ids = RepresentativeTechnician.objects.filter(
            representative=rep
        ).values_list("technician_id", flat=True)

        tasks = ServiceRequest.objects.filter(technician_id__in=technician_ids)

        serializer = RepresentativeTaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
class AssignTechnicianToTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        rep = request.user.profile

        if rep.user_type != "representative":
            return Response({"detail": "Only representatives can assign tasks."}, status=403)

        # Load task
        request_obj = ServiceRequest.objects.filter(id=request_id).first()
        if not request_obj:
            return Response({"detail": "Task not found."}, status=404)

        # Validate
        serializer = AssignTechnicianSerializer(
            data=request.data,
            context={"representative": rep, "request_obj": request_obj}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Task assigned successfully."})
    
from datetime import datetime, timedelta
from django.utils.timezone import now

class RepresentativeReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "representative":
            return Response(
                {"detail": "Only representatives can access this page."}, status=403
            )

        # -----------------------------
        # 1) Parse filters from request
        # -----------------------------
        period = request.GET.get("period", "current_month")      # default
        technician_filter = request.GET.get("technician", "all") # default

        # -----------------------------
        # 2) Get technicians of this rep
        # -----------------------------
        technician_ids = (
            RepresentativeTechnician.objects
            .filter(representative=profile)
            .values_list("technician_id", flat=True)
        )

        technicians = Profile.objects.filter(id__in=technician_ids)

        # -----------------------------
        # 3) Build base queryset
        # -----------------------------
        tasks = ServiceRequest.objects.filter(technician_id__in=technician_ids)

        # -----------------------------
        # 4) Apply period filter
        # -----------------------------
        today = now().date()

        if period == "today":
            tasks = tasks.filter(created_at__date=today)

        elif period == "this_week":
            week_start = today - timedelta(days=today.weekday())
            tasks = tasks.filter(created_at__date__gte=week_start)

        elif period == "current_month":
            first_day = today.replace(day=1)
            tasks = tasks.filter(created_at__date__gte=first_day)

        # else: "all" → no filter

        # -----------------------------
        # 5) Apply technician filter
        # -----------------------------
        if technician_filter != "all":
            try:
                tech_id = int(technician_filter)
                if tech_id in technician_ids:
                    tasks = tasks.filter(technician_id=tech_id)
            except:
                pass  # ignore invalid input

        tasks = tasks.order_by("-created_at")

        # -----------------------------
        # 6) DUMMY SUMMARY VALUES
        # -----------------------------
        total_income = 12880000
        total_tasks = tasks.count()
        avg_rating = 4.8
        efficiency = 92.0

        data = {
            "total_income": total_income,
            "total_tasks": total_tasks,
            "avg_rating": avg_rating,
            "efficiency": efficiency,
            "task_details": tasks,
        }

        serializer = RepresentativeReportSerializer(
            instance=data,
            context={"request": request}
        )

        return Response(serializer.data)
    
class RepresentativeEditView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        if profile.user_type != "representative":
            return Response({"detail": "Only representatives can edit their profile."}, status=403)

        serializer = RepresentativeEditSerializer(
            instance=profile,
            context={"request": request}
        )
        return Response(serializer.data)

    def post(self, request):
        profile = request.user.profile
        if profile.user_type != "representative":
            return Response({"detail": "Only representatives can edit their profile."}, status=403)

        serializer = RepresentativeEditSerializer(
            instance=profile,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({
            "detail": "Profile updated successfully",
            "data": serializer.data
        })
    
class ServiceRequestCreateView(generics.CreateAPIView):
    """
    API endpoint for customers to submit a new service request.
    Only users with profile.user_type == "customer" are allowed.
    """
    serializer_class = ServiceRequestCreateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        profile = self.request.user.profile
        if profile.user_type != "customer":
            raise PermissionDenied("Only customers can create service requests.")

        # Serializer will use request.user.profile internally for `customer`
        serializer.save()
