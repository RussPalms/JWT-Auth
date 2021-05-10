from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['fav_color'] = user.fav_color
        return token

class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in prefrence of the below.
    """
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwarg = {'password': {'write_only': True}}

    def create(self, valitated_data):
        password = valitated_data.pop('password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**valitated_data) 
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        