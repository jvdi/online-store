from django.shortcuts import render

from .models import Product

def index(request):
    latest_product_list = Product.objects.order_by('-insert_date')[:8]
    top_selling_product_list = Product.objects.order_by('-selling')[:8]
    # dictionary for send data to template
    context={
        'latest_product_list':latest_product_list,
        'top_selling_product_list':top_selling_product_list,
        }
    # Append data to dictionary
    context['product']=Product.objects.all()
    return render(request, 'shop/index.html', context)