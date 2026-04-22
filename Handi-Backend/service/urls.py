from django.urls import path
from .views import ProfileView, CustomerPanelView, TechnicianPanelView, AgentPanelView, AgentTeamView, AgentEditTechnicianView, AgentTaskListView, AssignTechnicianToTaskView, AgentReportView, AgentEditView, ServiceRequestCreateView

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
        "requests/create/",
        ServiceRequestCreateView.as_view(),
        name="service-request-create",
    ),
]
