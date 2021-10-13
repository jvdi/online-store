from django.apps import AppConfig


class ShopConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'shop'
    # translate - shop name to farsi
    verbose_name = 'فروشگاه'
