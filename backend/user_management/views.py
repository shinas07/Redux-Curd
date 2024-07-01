from rest_framework import generics,status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, UserProfile
from .serializers import ProfileSerializer, UserSerializer, RegisterSerializer ,AdminLoginSerializer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
# from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
# from .serializers import ProfileSerializer
from .models import UserProfile
from django.shortcuts import get_object_or_404

class RegisterView(APIView):
    def post(self, request, *args, **kwargs):
        print('haai api request is here')
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User successfully registerd.'
            }, status=status.HTTP_201_CREATED)
        else:
            print('Serializer errors:', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class LoginView(generics.GenericAPIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            print('user is data is not vaild')
            return Response({'error':"Invaild Credentials"}, status=400)
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh' : str(refresh),
            'access' : str(refresh.access_token),
        })
    




class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("GET request received") 
        user = request.user
        print(f"Authenticated user: {user.username}")

        profile = UserProfile.objects.filter(user=user).first()
        if profile:
            profile_image_url = profile.profile_image.url if profile.profile_image else None
        else:
            profile_image_url = None

        return Response({
            'username': user.username,
            'email': user.email,
            'profile_image': profile_image_url
        })
    
    

    def put(self, request, *args, **kwargs):
        user = User.objects.get(username=request.user.username)
        profile, created = UserProfile.objects.get_or_create(user=user)
        
        file_obj = request.FILES['profile_image']
        profile.profile_image = file_obj
        profile.save()

        serializer = ProfileSerializer(profile)
        return Response(serializer.data)


class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AdminLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        print('its valid')
        user = serializer.validated_data['user']

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'isAdmin': user.is_staff
        }, status=status.HTTP_200_OK)
    

#User List
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return User.objects.all()
    
#Admin User Update
class UserDetailView(APIView):

    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def post(self, reqeust):
        print('iam here')
        print('data', reqeust.data)
        serializer = RegisterSerializer(data=reqeust.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print('serializer errors:', serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

