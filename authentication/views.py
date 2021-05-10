from django.shortcuts import render
# for the serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
# added after testing most of frontend
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# When you feed data to a model serializer like we are doing here, as long as the 
# serializer has a create() or update() method, you can use serializer.save() to magically 
# create (or update) the corresponding object (in our case, CustomUser) and return the 
# instance.
class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)
    # We need to specify an empty list or tuple for authentication_classes in addition to 
    # setting permission_classes to convince DRF to open up a view to the public. 
    # Try again. No more 401 Unauthorized error.
    authentication_classes = () #added after testing frontend

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# this is were we would start creating the patient post signin/signup page
class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

# The view accepts a POSTed refresh_token, uses that to create a RefreshToken object for 
# access to the blacklist class method, and blacklists it. 
class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)