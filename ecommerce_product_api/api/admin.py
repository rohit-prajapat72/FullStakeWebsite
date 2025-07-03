from django.contrib import admin
from .models import *
from django.utils.html import format_html

# Register your models here.
# ✅ Inline: Product Images (limit 4)
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 4  # Show 4 image upload boxes in admin
    
    # ✅ Inline: Product Variants
class ProductVariantsInline(admin.TabularInline):
    model = ProductVariants
    extra = 1
    
# ✅ Inline: Product Reviews
class ProductReviewInline(admin.TabularInline):
    model = ProductReview
    extra = 0
    readonly_fields = ('user', 'rating', 'comment', 'created_at')
    can_delete = False
    
    
# ✅ Product Admin with Images, Variants, Reviews

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'price', 'stock_quantity', 'stock_status', 'status')
    list_filter = ('category', 'brand', 'stock_status', 'status')
    search_fields = ('name', 'description')
    inlines = [ProductImageInline, ProductVariantsInline, ProductReviewInline]

    
# ✅ Product Image Admin (Optional: view all uploaded images)
@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product','preview', 'uploaded_at')
    def preview(self, obj):
        return format_html('<img src="{}" width="100" height="100" />', obj.image.url)
    
# ✅ Product Review Admin (for all reviews)
@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ('product', 'user', 'rating', 'comment','created_at')
    list_filter = ('rating', 'created_at')
    search_fields = ('product__name', 'user__username')

# ✅ Product Variant Admin (optional direct control)
@admin.register(ProductVariants)
class ProductVariantsAdmin(admin.ModelAdmin):
    list_display = ('product','color', 'color_name', 'size', 'product_quantity')
    
# ✅ Shipping Address Admin
@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('user', 'order_id', 'city','address_line_1','address_line_2', 'state','country', 'zip_code', 'created_at')
    search_fields = ('user__username', 'order_id')
    
# ✅ Order Admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        'order_id',
        'user',
        'customer_name',
        'customer_email',
        'quantity',
        'status',
        'shipping_address',
        'order_date',
    )
    list_filter = ('status', 'order_date')
    search_fields = ('order_id', 'customer_name', 'customer_email', 'user__username')
    readonly_fields = ('order_date',)

# ✅ Coupon Admin
@admin.register(Coupon)
class CouponAdmin(admin.ModelAdmin):
    list_display = ('code', 'discount_percent', 'active', 'valid_from', 'valid_to')
    list_filter = ('active', 'valid_from', 'valid_to')
    search_fields = ('code',)












