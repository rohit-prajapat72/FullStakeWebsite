from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    profile_picture = models.ImageField(upload_to='profile_pictures', blank=True, null=True)
    
    def __str__(self):
        return self.user.username

# product category
class Category(models.Model):
    name= models.CharField(max_length=255)
    
    def __str__(self):
        return self.name
    
class Product(models.Model):
    STATUS_CHOICES = [
        ('active','Active'),
        ('inactive','Inactive')
    ]
    STOCK_STATUS_CHOICES = [
        ('available','Available'),
        ('unavailable','Unavailable'),
        ('out_of_stock','Out of Stock')    
    ]
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    brand = models.CharField(max_length=255)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    description = models.TextField()
    price = models.FloatField()
    discount_price = models.FloatField(blank=True , null=True)
    currency = models.CharField(max_length=10 , default='INR')
    stock_quantity  =models.PositiveIntegerField()
    stock_status = models.CharField(max_length=20 , choices=STOCK_STATUS_CHOICES)
    status = models.CharField(max_length=20 , choices= STATUS_CHOICES)
    features = models.JSONField(blank=True,null=True)
    featured = models.BooleanField(default=True)    
    
    warranty = models.CharField(max_length=255 , default='1 Year Manufacturer Warranty')
    delivery_info  =models.TextField(default='Delivery in 2-4 working days.')
    return_policy = models.TextField(default='7 days return or replacement policy.')
    payment_method = models.TextField(default='Pay On Delivery')
    
    created_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    def update_stock_status(self):
        if self.stock_quantity > 0:
            self.stock_status = 'available'
        else:
            self.stock_status = 'out_of_stock'
        self.save()

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)
    def __str__(self):
        return self.name
    
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product , related_name='images',on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Image for {self.product.name}"
    
class ProductReview(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    image = models.ImageField(upload_to='review_images/')
    rating = models.FloatField (validators=[MinValueValidator(1),MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.product.name
    
    
class ProductVariants(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    color = models.CharField(max_length=50)
    color_name = models.CharField(max_length=50)
    size = models.CharField(max_length=50)
    product_quantity = models.PositiveIntegerField()
    
    
class ShippingAddress(models.Model):
    user= models.ForeignKey(User , on_delete=models.CASCADE)
    order_id = models.CharField(max_length=100,unique=True) 
    address_line_1= models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255 , blank=True)
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.city}, {self.country}"
    
class Order(models.Model):
    STATUS=[
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('completed','Completed'),
        ('returned','Returned') 
    ]
    PAYMENT_METHOD_CHOICES = [
    ('cod', 'Cash on Delivery'),
    ('card', 'Credit/Debit Card'),
    ('upi', 'UPI'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    order_id = models.CharField(max_length=100,unique=True)
    customer_name = models.CharField(max_length=100)
    quantity = models.IntegerField(default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, default='cod')
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    order_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS, default='pending')
    shipping_address = models.ForeignKey(ShippingAddress, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"Order #{self.id} - {self.user.username}"
    
class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount_percent = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(90)])
    active = models.BooleanField(default=True)
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    
    def Discount_total(self):
        return self.discount_percent / 100 * self.order.total_amount

    def __str__(self):
        return self.code