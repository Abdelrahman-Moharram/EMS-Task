from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['id'] = str(user.id)
        token['email'] = user.email
        token['username'] = user.username
        if user.role:
            token['role'] = user.role.name
        # ...

        return token


class BaseUserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'email', 'username']

class UserSerial(serializers.ModelSerializer):
    class Meta:
        model= User
        fields=['id', 'email', 'username', 'role']