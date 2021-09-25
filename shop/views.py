from django.shortcuts import render

from .models import Product

def index(request):
    special_product_list = Product.objects.filter(special=1).order_by('-insert_date')
    latest_product_list = Product.objects.order_by('-insert_date')[:8]
    top_selling_product_list = Product.objects.order_by('-selling')[:8]
    # dictionary for send data to template
    context={
        'special_product_list':special_product_list,
        'latest_product_list':latest_product_list,
        'top_selling_product_list':top_selling_product_list,
        }
    return render(request, 'shop/index.html', context)

def cart(request):
    # dictionary for compile template -> variables
    context={}
    # render for send variable and detail to template
    return render(request, 'shop/cart.html', context)

def login(request):
    # dictionary for compile template -> variables
    context={}
    # render for send variable and detail to template
    return render(request, 'shop/login.html', context)

def register(request):
    # dictionary for compile template -> variables
    context={}
    # render for send variable and detail to template
    return render(request, 'shop/register.html', context)