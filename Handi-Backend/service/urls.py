from django.urls import path
from .views import ProfileView, CustomerPanelView, TechnicianPanelView, RepresentativePanelView, RepresentativeTeamView, RepresentativeEditTechnicianView, RepresentativeTaskListView, AssignTechnicianToTaskView, RepresentativeReportView, RepresentativeEditView

urlpatterns = [
    path('me/', ProfileView.as_view(), name='profile-me'),
    path("dashboard/customer/", CustomerPanelView.as_view(), name="customer-panel"),
    path("dashboard/technician/", TechnicianPanelView.as_view(), name="technician-panel"),
    path("dashboard/representative/", RepresentativePanelView.as_view(), name="representative-panel"),
    path("dashboard/representative/team/", RepresentativeTeamView.as_view(), name="rep-team"),
    path(
        "dashboard/representative/team/<int:technician_id>/",
        RepresentativeEditTechnicianView.as_view(),
        name="rep-edit-technician"
    ),
    path("dashboard/representative/tasks/", RepresentativeTaskListView.as_view(), name="rep-tasks"),
    path(
        "dashboard/representative/tasks/<int:request_id>/assign/",
        AssignTechnicianToTaskView.as_view(),
        name="rep-assign-task"
    ),
    path("dashboard/representative/report/", RepresentativeReportView.as_view(), name="rep-report"),
    path("dashboard/representative/edit/", RepresentativeEditView.as_view()),
]
