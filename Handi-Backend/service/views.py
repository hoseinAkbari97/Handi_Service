from rest_framework import generics, permissions
from .models import Profile
from .serializers import ProfileSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Create profile on the fly if missing
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile
