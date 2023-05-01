# mysite/firstsite/apis/account/serializers.py

from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import Group, Permission

from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        exclude = ("password", "groups", "user_permissions")


class GroupSerializer(ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"
        # exclude = ("permissions", )


class PermissionSerializer(ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"
        depth = 1
