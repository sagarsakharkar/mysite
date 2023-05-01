# api/server/apps/accounts/urls.py

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CustomUserView,
    GroupView,
)

router = DefaultRouter()
router.register(r"account", CustomUserView)
router.register(r"group", GroupView)

# Added groups route

account_urls = [
    path("api/v1/user/", include(router.urls)),
]
