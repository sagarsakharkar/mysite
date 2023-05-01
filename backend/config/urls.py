from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from apis.account.urls import account_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/jwt/create/", TokenObtainPairView.as_view(), name="create_token"),
    path("auth/jwt/refresh/", TokenRefreshView.as_view(), name="verify_token"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
]

urlpatterns += account_urls

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# # This has to be end of line coz its run react build with their own routes
# urlpatterns += [re_path('^.*', views.index, name="index")]
