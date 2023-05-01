# mysite/firstsite/apis/account/views.py

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import Group, Permission

from .models import User
from .serializers import UserSerializer, GroupSerializer, PermissionSerializer

class CustomUserView(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GroupView(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    @action(detail=True)
    def permissions(self, request, pk=None):
        """
        Returns a list of all the groups that the given
        user belongs to.
        """
        object = self.get_object()
        permissions = object.permissions.all()
        serializer = PermissionSerializer(permissions, many=True)

        return Response(serializer.data)

    @action(detail=True)
    def users(self, request, pk=None):
        """
        Returns a list of all the users that the given
        group belongs to.
        """
        object = self.get_object()
        users = object.user_set.all()
        serializer = UserSerializer(users, many=True)

        return Response(serializer.data)


class PermissionView(ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
