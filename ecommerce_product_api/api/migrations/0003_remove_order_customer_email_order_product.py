# Generated by Django 5.1.4 on 2025-07-05 03:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_product_payment_method_userprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='customer_email',
        ),
        migrations.AddField(
            model_name='order',
            name='product',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.product'),
            preserve_default=False,
        ),
    ]
