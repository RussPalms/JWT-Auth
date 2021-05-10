from django.shortcuts import render
# for the serializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer

class ObtainTokenPairWithColorView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# When you feed data to a model serializer like we are doing here, as long as the 
# serializer has a create() or update() method, you can use serializer.save() to magically 
# create (or update) the corresponding object (in our case, CustomUser) and return the 
# instance.
class CustomUserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

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