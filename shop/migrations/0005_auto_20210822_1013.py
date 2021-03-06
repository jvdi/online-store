# Generated by Django 3.2.6 on 2021-08-22 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0004_alter_product_selling'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='price',
            field=models.BigIntegerField(blank=True, null=True, verbose_name='قیمت محصول'),
        ),
        migrations.AlterField(
            model_name='product',
            name='selling',
            field=models.IntegerField(blank=True, null=True, verbose_name='تعداد فروش انجام شده محصول'),
        ),
    ]
