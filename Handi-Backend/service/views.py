from django.db.models import Q
from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import Profile, ServiceRequest, AgentTechnician, ServiceRequestPackage
from .serializers import (
    ProfileSerializer,
    CustomerPanelSerializer,
    ActiveRequestSerializer,  
    TechnicianSerializer,     
    TechnicianPanelSerializer,
    RecentRequestSerializer,
    AgentPanelSerializer,
    AgentTechnicianFullSerializer,
    TechnicianEditSerializer,
    AgentTaskSerializer,
    AssignTechnicianSerializer,
    AgentReportSerializer,
    AgentTaskDetailSerializer,
    AgentEditSerializer,
    ServiceRequestCreateSerializer,
    CustomerServiceRequestSerializer,
    AgentAcceptRequestSerializer,
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
    
class AgentPanelView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        # Ensure user is agent
        if profile.user_type != "agent":
            return Response({"detail": "Only agents can access this panel."}, status=403)

        # ---------------------------------------------------------
        # TECHNICIANS OF THIS AGENT
        # ---------------------------------------------------------
        technicians = Profile.objects.filter(
            agent_links__agent=profile
        )

        team_size = technicians.count()

        # ---------------------------------------------------------
        # ACTIVE JOBS OF TODAY (assigned to the agent's technicians)
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

        serializer = AgentPanelSerializer(
            instance=data_to_serialize,
            context={"request": request}
        )

        return Response(serializer.data)
    
class AgentTeamView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rep = request.user.profile

        if rep.user_type != "agent":
            return Response({"detail": "Only agents can access this"}, status=403)

        technicians = Profile.objects.filter(
            user_type="technician",
            agent_links__agent=rep
        )

        serializer = AgentTechnicianFullSerializer(
            technicians, many=True, context={"request": request}
        )

        return Response(serializer.data)
    
class AgentEditTechnicianView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, technician_id):
        rep = request.user.profile

        # ensure the technician belongs to this representative
        technician = Profile.objects.filter(
            id=technician_id,
            user_type="technician",
            agent_links__agent=rep
        ).first()

        if not technician:
            return Response({"detail": "Technician not found in your team"}, status=404)

        serializer = TechnicianEditSerializer(
            technician, data=request.data, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Technician updated successfully"})
    
class AgentTaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        rep = request.user.profile

        if rep.user_type != "agent":
            return Response({"detail": "Only agents can access this."}, status=403)

        # 1) pending requests without technician
        # 2) requests assigned to this agent's technicians

        technician_ids = AgentTechnician.objects.filter(
            agent=rep
        ).values_list("technician_id", flat=True)

        tasks = ServiceRequest.objects.filter(
            Q(status="pending", technician__isnull=True) |
            Q(agent=rep) |
            Q(technician_id__in=technician_ids)
        ).distinct().order_by("-created_at")

        serializer = AgentTaskSerializer(tasks, many=True)
        return Response(serializer.data)
    
class AssignTechnicianToTaskView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, request_id):
        rep = request.user.profile

        if rep.user_type != "agent":
            return Response({"detail": "Only agents can assign tasks."}, status=403)

        # Load task
        request_obj = ServiceRequest.objects.filter(id=request_id).first()
        if not request_obj:
            return Response({"detail": "Task not found."}, status=404)

        # Validate
        serializer = AssignTechnicianSerializer(
            data=request.data,
            context={"agent": rep, "request_obj": request_obj}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({"detail": "Task assigned successfully."})
    
from datetime import datetime, timedelta
from django.utils.timezone import now

class AgentReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "agent":
            return Response(
                {"detail": "Only agents can access this page."}, status=403
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
            AgentTechnician.objects
            .filter(agent=profile)
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

        serializer = AgentReportSerializer(
            instance=data,
            context={"request": request}
        )

        return Response(serializer.data)
    
class AgentEditView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        if profile.user_type != "agent":
            return Response({"detail": "Only agents can edit their profile."}, status=403)

        serializer = AgentEditSerializer(
            instance=profile,
            context={"request": request}
        )
        return Response(serializer.data)

    def post(self, request):
        profile = request.user.profile
        if profile.user_type != "agent":
            return Response({"detail": "Only agents can edit their profile."}, status=403)

        serializer = AgentEditSerializer(
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

class CustomerServiceRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "customer":
            return Response(
                {"detail": "Only customers can view their own requests."},
                status=403
            )

        requests_qs = ServiceRequest.objects.filter(
            customer=profile
        ).order_by("-created_at")

        serializer = CustomerServiceRequestSerializer(requests_qs, many=True)

        return Response(serializer.data)
    
class CustomerServiceRequestDetailView(APIView):
    permission_classes = [IsAuthenticated] 

    def get_object(self, request, request_id):
        return ServiceRequest.objects.select_related(
            "technician",
            "agent",
            "customer"
        ).prefetch_related("packages").get(
            id=request_id,
            customer=request.user.profile
        )

    def get(self, request, request_id):
        try:
            service_request = ServiceRequest.objects.select_related(
                "technician",
                "agent",
                "customer__user"
            ).prefetch_related("packages").get(
                id=request_id,
                customer=request.user.profile
            )
        except ServiceRequest.DoesNotExist:
            return Response(
                {"detail": "Service request not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CustomerServiceRequestSerializer(service_request)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, request_id):
        try:
            service_request = self.get_object(request, request_id)
        except ServiceRequest.DoesNotExist:
            return Response(
                {"detail": "Service request not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        action = request.data.get("action")

        # ✅ Reject all packages
        if action == "reject":
            service_request.status = "cancelled"
            service_request.save()

            return Response(
                {"detail": "Request cancelled successfully."},
                status=status.HTTP_200_OK
            )

        # ✅ Accept one package
        if action == "accept":
            package_id = request.data.get("package_id")

            if not package_id:
                return Response(
                    {"detail": "package_id is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            try:
                selected_package = service_request.packages.get(id=package_id)
            except ServiceRequestPackage.DoesNotExist:
                return Response(
                    {"detail": "Invalid package selected."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # assign technician from selected package
            service_request.technician = selected_package.technician
            service_request.status = "approved"
            service_request.save()

            return Response(
                {"detail": "Package accepted successfully."},
                status=status.HTTP_200_OK
            )

        return Response(
            {"detail": "Invalid action."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
accept_request_example = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={
        "packages": openapi.Schema(
            type=openapi.TYPE_ARRAY,
            items=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    "package_type": openapi.Schema(
                        type=openapi.TYPE_STRING,
                        example="normal"
                    ),
                    "technician_id": openapi.Schema(
                        type=openapi.TYPE_INTEGER,
                        example=5
                    ),
                    "price": openapi.Schema(
                        type=openapi.TYPE_INTEGER,
                        example=350000
                    ),
                    "description": openapi.Schema(
                        type=openapi.TYPE_STRING,
                        example="Basic service with standard technician"
                    ),
                }
            )
        )
    }
)
    
class AgentAcceptRequestView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=accept_request_example,
        responses={200: "Request accepted successfully"}
    )

    def post(self, request, pk):
        profile = request.user.profile

        if profile.user_type != "agent":
            return Response({"detail": "Only agents can accept tasks."}, status=403)

        try:
            request_obj = ServiceRequest.objects.get(id=pk, status="pending")
        except ServiceRequest.DoesNotExist:
            return Response({"detail": "Invalid or already processed request"}, status=404)

        serializer = AgentAcceptRequestSerializer(
            data=request.data,
            context={"agent": profile, "request_obj": request_obj}
        )

        if serializer.is_valid():
            serializer.save()
            return Response({"detail": "Request accepted and packages created."})

        return Response(serializer.errors, status=400)
    
class TechnicianServiceRequestListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        if profile.user_type != "technician":
            return Response(
                {"detail": "Only technicians can access this."},
                status=403
            )

        requests_qs = ServiceRequest.objects.select_related(
            "customer__user",
            "agent"
        ).filter(
            technician=profile
        ).order_by("-created_at")

        serializer = CustomerServiceRequestSerializer(
            requests_qs,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)

class TechnicianServiceRequestDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, request, request_id):
        return ServiceRequest.objects.select_related(
            "customer__user",
            "agent",
            "technician"
        ).get(
            id=request_id,
            technician=request.user.profile
        )

    def get(self, request, request_id):
        profile = request.user.profile

        if profile.user_type != "technician":
            return Response(
                {"detail": "Only technicians can access this."},
                status=403
            )

        try:
            service_request = self.get_object(request, request_id)
        except ServiceRequest.DoesNotExist:
            return Response(
                {"detail": "Request not found."},
                status=404
            )

        serializer = CustomerServiceRequestSerializer(
            service_request,
            context={"request": request}
        )

        return Response(serializer.data)

    def post(self, request, request_id):
        profile = request.user.profile

        if profile.user_type != "technician":
            return Response(
                {"detail": "Only technicians can perform this action."},
                status=403
            )

        try:
            service_request = self.get_object(request, request_id)
        except ServiceRequest.DoesNotExist:
            return Response(
                {"detail": "Request not found."},
                status=404
            )

        action = request.data.get("action")

        # ✅ Accept job
        if action == "accept":
            if service_request.status != "approved":
                return Response(
                    {"detail": "Only approved requests can be accepted."},
                    status=400
                )

            service_request.status = "in_progress"
            service_request.save()

            return Response(
                {"detail": "Request accepted. Status updated to in_progress."}
            )

        # ✅ Reject job
        if action == "reject":
            if service_request.status != "approved":
                return Response(
                    {"detail": "Only approved requests can be rejected."},
                    status=400
                )

            service_request.status = "cancelled"
            service_request.save()

            return Response(
                {"detail": "Request rejected and cancelled."}
            )

        # ✅ Complete job
        if action == "complete":
            if service_request.status != "in_progress":
                return Response(
                    {"detail": "Only in_progress requests can be completed."},
                    status=400
                )

            service_request.status = "completed"
            service_request.save()

            return Response(
                {"detail": "Request marked as completed."}
            )

        return Response(
            {"detail": "Invalid action."},
            status=400
        )
