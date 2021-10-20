from django.shortcuts import render
from decouple import config

# zarinpal
from django.http import HttpResponse
from django.shortcuts import redirect
import requests
import json
# end zarinpal

from .models import Product

# view for index page : show last post(product)
def index(request):
    # get data from database with special filter or order
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

# zarinpal - pay
# for start pay and verify pay in site by zpal
MERCHANT = config('MERCHANT_CODE')
ZP_API_REQUEST = "https://api.zarinpal.com/pg/v4/payment/request.json"
ZP_API_VERIFY = "https://api.zarinpal.com/pg/v4/payment/verify.json"
ZP_API_STARTPAY = "https://www.zarinpal.com/pg/StartPay/{authority}"
amount = 11000  # Rial / Required
description = "تراکنش آزمایشی"  # Required
email = 'm.javidii@yahoo.com'  # Optional
mobile = '09123456789'  # Optional
# Important: need to edit for realy server.
CallbackURL = 'http://127.0.0.1:8000/verify/'


def send_request(request):
    req_data = {
        "merchant_id": MERCHANT,
        "amount": amount,
        "callback_url": CallbackURL,
        "description": description,
        "metadata": {"mobile": mobile, "email": email}
    }
    req_header = {"accept": "application/json",
                  "content-type": "application/json'"}
    req = requests.post(url=ZP_API_REQUEST, data=json.dumps(
        req_data), headers=req_header)
    authority = req.json()['data']['authority']
    if len(req.json()['errors']) == 0:
        return redirect(ZP_API_STARTPAY.format(authority=authority))
    else:
        e_code = req.json()['errors']['code']
        e_message = req.json()['errors']['message']
        return HttpResponse(f"Error code: {e_code}, Error Message: {e_message}")


def verify(request):
    t_status = request.GET.get('Status')
    t_authority = request.GET['Authority']
    if request.GET.get('Status') == 'OK':
        req_header = {"accept": "application/json",
                      "content-type": "application/json'"}
        req_data = {
            "merchant_id": MERCHANT,
            "amount": amount,
            "authority": t_authority
        }
        req = requests.post(url=ZP_API_VERIFY, data=json.dumps(req_data), headers=req_header)
        if len(req.json()['errors']) == 0:
            t_status = req.json()['data']['code']
            if t_status == 100:
                return HttpResponse('Transaction success.\nRefID: ' + str(
                    req.json()['data']['ref_id']
                ))
            elif t_status == 101:
                return HttpResponse('Transaction submitted : ' + str(
                    req.json()['data']['message']
                ))
            else:
                return HttpResponse('Transaction failed.\nStatus: ' + str(
                    req.json()['data']['message']
                ))
        else:
            e_code = req.json()['errors']['code']
            e_message = req.json()['errors']['message']
            return HttpResponse(f"Error code: {e_code}, Error Message: {e_message}")
    else:
        return HttpResponse('Transaction failed or canceled by user')
# end - zarinpal