from django.contrib import admin

from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    # sort display of list in post list
    list_display = ('name', 'insert_date', 'price', 'selling')