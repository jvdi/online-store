# Generated by Django 3.2.6 on 2021-08-22 08:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0005_auto_20210822_1013'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='price_old',
            field=models.BigIntegerField(blank=True, null=True, verbose_name='قیمت قبلی محصول'),
        ),
    ]