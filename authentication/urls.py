from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import ObtainTokenPairWithColorView, CustomUserCreate, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView
# can also be rewritten as 
# from .views import *

urlpatterns = [
    # View + Serializer + URL = good to go.
    path('user/create/', CustomUserCreate.as_view(), name='create_user'),
    # path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/obtain/', ObtainTokenPairWithColorView.as_view(), name='token_create'),
    # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
]