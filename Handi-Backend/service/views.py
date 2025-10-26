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
    

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def whoami(request):
    return Response({
        "user_id": request.user.id,
        "phone": request.user.phone
    })

