from django.urls import path
from .views import (
    ProfileView, 
    CustomerPanelView, 
    TechnicianPanelView, 
    AgentPanelView, 
    AgentTeamView, 
    AgentEditTechnicianView, 
    AgentTaskListView, 
    AssignTechnicianToTaskView, 
    AgentReportView, 
    AgentEditView, 
    ServiceRequestCreateView, 
    CustomerServiceRequestsView, 
    AgentAcceptRequestView,
    CustomerServiceRequestDetailView,
    TechnicianServiceRequestListView,
    TechnicianServiceRequestDetailView,
)

urlpatterns = [
    path('me/', ProfileView.as_view(), name='profile-me'),
    path("dashboard/customer/", CustomerPanelView.as_view(), name="customer-panel"),
    path("dashboard/technician/", TechnicianPanelView.as_view(), name="technician-panel"),
    path("dashboard/agent/", AgentPanelView.as_view(), name="agent-panel"),
    path("dashboard/agent/team/", AgentTeamView.as_view(), name="agent-team"),
    path(
        "dashboard/agent/team/<int:technician_id>/",
        AgentEditTechnicianView.as_view(),
        name="agent-edit-technician"
    ),
    path("dashboard/agent/tasks/", AgentTaskListView.as_view(), name="agent-tasks"),
    path(
        "dashboard/agent/tasks/<int:request_id>/assign/",
        AssignTechnicianToTaskView.as_view(),
        name="agent-assign-task"
    ),
    path("dashboard/agent/report/", AgentReportView.as_view(), name="agent-report"),
    path("dashboard/agent/edit/", AgentEditView.as_view()),
    path(
        "dashboard/customer/requests/create/",
        ServiceRequestCreateView.as_view(),
        name="service-request-create",
    ),
    path(
        "dashboard/customer/requests/", 
        CustomerServiceRequestsView.as_view(), 
        name="my-requests"
    ),
    path(
        "dashboard/agent/tasks/<int:pk>/accept/", 
        AgentAcceptRequestView.as_view()),
    path(
        "dashboard/customer/requests/<int:request_id>/",
        CustomerServiceRequestDetailView.as_view(),
        name="customer_service_request_detail",
    ),
    path(
        "dashboard/technician/requests/",
        TechnicianServiceRequestListView.as_view(),
        name="technician-requests"
    ),
    path(
        "dashboard/technician/requests/<int:request_id>/",
        TechnicianServiceRequestDetailView.as_view(),
        name="technician-request-detail"
    ),

]
