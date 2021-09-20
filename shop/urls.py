from django.urls import path

from . import views

app_name = 'shop'
urlpatterns = [
    # ex: /
    path('', views.index, name='index'),
    # ex: cart/
    path('cart/', views.cart, name='cart'),
    # ex: login/
    path("login/", views.login, name="login")
]
