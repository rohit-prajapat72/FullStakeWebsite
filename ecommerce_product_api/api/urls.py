from django.urls import path , include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

# registering viewset
router.register('products',ProductViewSet ,basename='product')
router.register('orders', OrderViewSet, basename='orders')
router.register('reviews', ProductReviewViewSet, basename='review')


urlpatterns = [
    path('',include(router.urls)),
    path('login/',LoginView.as_view() ,name='login'),
    path('register/',RegisterView.as_view() , name='register'),
    path('profile/',ProfileView.as_view(), name='profile'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_api'),
    path('reset-password-confirm/', PasswordResetConfirmView.as_view(), name='reset-password-confirm'),
]
