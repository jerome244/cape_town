from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from .views import RegisterView, me

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("me/", me, name="me"),

    # Optional: only works if token_blacklist app is enabled + migrated
    path("blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),
]
