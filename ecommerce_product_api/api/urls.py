from django.urls import path , include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

# registering viewset
router.register('products',ProductViewSet ,basename='product')
router.register('reviews', ProductReviewViewSet, basename='review')


urlpatterns = [
    path('',include(router.urls)),
    path('register/',RegisterView.as_view() , name='register'),
    path('profile/',ProfileView.as_view(), name='profile'),
    path('contact/', ContactView.as_view(), name='contact'),
    path('create-order/', CreateOrderView.as_view(), name='create-order'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='password_reset_api'),
    path('reset-password-confirm/', PasswordResetConfirmView.as_view(), name='reset-password-confirm'),
    path('create/', CreateOrderView.as_view(), name='create-order'),
    path('my-orders/', MyOrdersView.as_view(), name='my-orders'),  # ✅ Next step
]
