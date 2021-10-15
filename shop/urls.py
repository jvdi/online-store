from django.urls import path

from . import views

app_name = 'shop'
urlpatterns = [
    # ex: /
    path('', views.index, name='index'),
    # ex: cart/
    path('cart/', views.cart, name='cart'),
    # ex: login/
    path("login/", views.login, name="login"),
    # ex: regiser
    path("register/", views.register, name="register"),
    # zarinpal pay-url
    path('request/', views.send_request, name='request'),
    path('verify/', views.verify, name='verify'),
]
