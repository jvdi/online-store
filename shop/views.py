from django.shortcuts import render

from .models import Product

def index(request):
    # dictionary for send data to template
    context={}
    # Append data to dictionary
    context['product']=Product.objects.all()
    return render(request, 'shop/index.html', context)