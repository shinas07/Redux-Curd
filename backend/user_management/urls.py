from django.urls import path
from . import views
from .views import RegisterView, LoginView , UserProfileView, AdminLoginView, UserListView, UserDetailView

app_name = 'user_management'

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile_imgUpload/', UserProfileView.as_view(), name='profile-imgUpload'),
    path('admin-login/', AdminLoginView.as_view(), name='admin-login'),
    path('admin-userData/',UserListView.as_view(), name='admin-userdata'),
    path('admin-user-delete/<int:pk>/',UserDetailView.as_view(), name='admin-userdata-delete'),
    path('admin-addUser', UserDetailView.as_view(), name='admin-addUser'),
]