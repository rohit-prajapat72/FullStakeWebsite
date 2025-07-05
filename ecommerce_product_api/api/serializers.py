from rest_framework import serializers
from .models import *
from django.contrib.auth.password_validation import validate_password


# user Authentication 
# Signup Serializer
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Passwords must match.")
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user

# login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

# user Profile
class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'bio', 'image']


# category serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariants
        fields = ['id', 'color', 'color_name', 'size', 'product_quantity']

class ReviewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']

class ProductReviewSerializer(serializers.ModelSerializer):
    user = ReviewUserSerializer()

    class Meta:
        model = ProductReview
        fields = ['id', 'user', 'rating', 'comment', 'created_at']
        
class ShippingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'   

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    images = ProductImageSerializer(many=True, read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    ratings = serializers.SerializerMethodField()
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'brand', 'category', 'description',
            'price', 'discount_price', 'currency', 'stock_quantity',
            'stock_status', 'status', 'images', 'variants',
            'features','featured', 'warranty', 'delivery_info','payment_method', 'return_policy',
            'ratings', 'reviews', 'created_at','update_at'
        ]

    def get_ratings(self, obj):
        total_reviews = obj.reviews.count()
        average_rating = obj.reviews.aggregate(models.Avg('rating'))['rating__avg'] or 0
        return {
            'average_rating': round(average_rating, 1),
            'total_reviews': total_reviews
        }

# order serializer 
class OrderSerializer(serializers.ModelSerializer):
    shipping_address = ShippingSerializer()

    class Meta:
        model = Order
        fields = [
            'id', 'order_id', 'product', 'customer_name',
            'quantity', 'total_price', 'payment_method', 'is_paid', 'paid_at',
            'status', 'order_date', 'shipping_address'
        ]
        read_only_fields = ['user', 'order_id', 'order_date']

    