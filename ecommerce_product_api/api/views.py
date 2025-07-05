from django.shortcuts import render
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions
from rest_framework import viewsets, filters
from django.core.mail import send_mail,BadHeaderError
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from rest_framework.permissions import AllowAny
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated




# Create your views here.
# user Authentication
# Signup
class RegisterView(APIView):
    permission_classes = [AllowAny]  # ✅ Yeh line ensure karo
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=201)
        return Response(serializer.errors, status=400)

#login view  
class LoginView(APIView):
    permission_classes = [AllowAny]  # ✅ Yeh line ensure karo
    def post(self, request):
        serializer = LoginSerializer(data = request.data)
        if serializer.is_valid():
            user = authenticate(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password']
            )
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    'refresh':str(refresh),
                    'access': str(refresh.access_token),
                },status=status.HTTP_200_OK)
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
 
# reset password 

# STEP 1: Request Password Reset
class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):  # <- Yeh class ke andar hona chahiye tha
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email is required'}, status=400)

        users = User.objects.filter(email=email)
        if not users.exists():
            return Response({'detail': 'No user found with this email'}, status=404)

        for user in users:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_url = f"http://localhost:5173/reset-password/{uid}/{token}/"

            send_mail(
                subject="Reset your password",
                message=f"Click here to reset your password: {reset_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],
                fail_silently=False,
            )
        return Response({'detail': 'Password reset link sent!'}, status=200)

# STEP 2: Confirm new password via UID and Token
class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        uidb64 = request.data.get("uid")
        token = request.data.get("token")
        password = request.data.get("password")
        confirm_password = request.data.get("password2")

        if not all([uidb64, token, password, confirm_password]):
            return Response({"error": "All fields are required."}, status=400)

        if password != confirm_password:
            return Response({"error": "Passwords do not match."}, status=400)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception:
            return Response({"error": "Invalid reset link."}, status=400)

        if not default_token_generator.check_token(user, token):
            return Response({"error": "Token expired or invalid."}, status=400)

        user.set_password(password)
        user.save()
        return Response({"message": "Password has been reset successfully."}, status=200)

# Profile View / Update
class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserProfileSerializer

    def get_object(self):
        return self.request.user.profile

# contect message
class ContactView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        message = request.data.get('message')

        if not (username and email and message):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        subject = f'New Contact Message from {username}'
        body = f'Email: {email}\n\nMessage:\n{message}'

        try:
            send_mail(
                subject,
                body,
                from_email='rohitdtr2021@gmail.com',
                recipient_list=['rohitdtr2021@gmail.com'],  # Change this to your actual recipient email
                fail_silently=False,
            )
            return Response({"message": "Message sent successfully"}, status=status.HTTP_200_OK)

        except BadHeaderError:
            return Response({"error": "Invalid header found."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print("Email send failed:", str(e))  # This will show in console
            return Response({"error": f"Email send failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# product view
class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(status='active').order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand', 'category__name']
    ordering_fields = ['price', 'created_at']
    
    

# Order ViewSet
class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        user = request.user

        shipping_data = data.get("shipping_address")
        shipping_serializer = ShippingSerializer(data=shipping_data)
        if not shipping_serializer.is_valid():
            return Response(
                {"shipping_errors": shipping_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save shipping address
        shipping = ShippingAddress.objects.create(user=user, **shipping_serializer.validated_data)

        # Handle optional fields like paid_at
        is_paid = data.get("is_paid", False)
        paid_at = now() if is_paid else None

        # Prepare order data
        order_data = {
            "user": user.id,
            "shipping_address": shipping.id,
            "product": data.get("product"),
            "customer_name": data.get("customer_name"),
            "quantity": data.get("quantity"),
            "total_price": data.get("total_price"),
            "payment_method": data.get("payment_method", "COD"),
            "is_paid": is_paid,
            "paid_at": paid_at,
            "status": data.get("status", "pending")
        }

        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order = order_serializer.save(user=user, shipping_address=shipping)
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {"order_errors": order_serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

# Review ViewSet
class ProductReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ProductReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ProductReview.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)