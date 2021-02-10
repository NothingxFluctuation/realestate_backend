from django.urls import path 
from main import views

urlpatterns = [
    path('', views.index,name='home'),
    path('user', views.user,name='user'),
    path('signup_firm', views.signup_firm,name='signup_firm'),
    path('signup_indi', views.signup_indi,name='signup_indi'),
    path('login', views.login_user,name='login'),
    path('login_indi', views.login_user_indi,name='login_indi'),
    path('logout', views.logout_user,name='logout'),
    path('Phone_verify', views.Phone_verify,name='Phone_verify'),
    path('Phone_verify_firm', views.Phone_verify_firm,name='Phone_verify_firm'),
]
