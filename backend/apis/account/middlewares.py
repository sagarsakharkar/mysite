from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from django.utils import timezone


class EmailOrUsernameModelBackend(ModelBackend):

    def authenticate(self, request, username=None, password=None, **kwargs):
        print(f'User is Authenticating .... ({username})')
        user_model = get_user_model()

        if username is None:
            username = kwargs.get(user_model.USERNAME_FIELD)

        user = user_model._default_manager.filter(
            Q(**{user_model.USERNAME_FIELD: username}) | 
            Q(email__iexact=username)
        ).first()

        # Test whether any matched user has the provided password:
        if user and user.check_password(password):
            user.last_login = timezone.now()
            user.save()
            return user

        if not user:
            user_model().set_password(password)