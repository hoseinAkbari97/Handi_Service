from django.urls import path
from .views import ProfileView, CustomerPanelView, TechnicianPanelView, RepresentativePanelView

urlpatterns = [
    path('me/', ProfileView.as_view(), name='profile-me'),
    path("dashboard/customer/", CustomerPanelView.as_view(), name="customer-panel"),
    path("dashboard/technician/", TechnicianPanelView.as_view(), name="technician-panel"),
    path("dashboard/representative/", RepresentativePanelView.as_view(), name="representative-panel"),
]
