from .models import UserProfile 
from rest_framework import serializers
from user_management.models import User
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

        

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User  
        fields = ['username', 'email', 'password']

    def validate_username(self, value):
        if User.objects.filter(username = value).exists():
            raise serializers.ValidationError("This username is already in use")
        return value
        
    def validate_email(self, value):
        if User.objects.filter(email = value).exists():
            raise serializers.ValidationError('This email address is alreadt registered.')
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")
        if username and password:
            user = authenticate(username=username, password=password)
            if user:
                return user
            raise serializers.ValidationError("Incorrect Credentials")
        else:
            raise serializers.ValidationError("Must include \"username\" and \"password\"")
        


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'profile_image',)

#admin serializer
class AdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    
    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)
            if not user:
                raise AuthenticationFailed('Invalid login credentials.')
            if not user.is_staff:
                raise AuthenticationFailed('User is not an admin.')
        else:
            raise serializers.ValidationError('Must include "username" and "password".')
        data['user'] = user
        return data
    
class AdminUserDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'