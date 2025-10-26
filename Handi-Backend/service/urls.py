from django.urls import path
from .views import ProfileView, whoami

urlpatterns = [
    path('me/', ProfileView.as_view(), name='profile-me'),
    path('whoami/', whoami),
]
