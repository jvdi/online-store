from django.db import models

# Table for store product name nad detail
class Product(models.Model):
    name = models.CharField(max_length=100, verbose_name="نام محصول")
    special = models.BooleanField(verbose_name="محصول ویژه")
    insert_date = models.DateTimeField(verbose_name="ژمان ورود محصول به فروشگاه")
    selling = models.IntegerField(verbose_name="تعداد فروش انجام شده محصول", null=True, blank=True)
    price = models.BigIntegerField(verbose_name="قیمت محصول", null=True, blank=True)
    price_old = models.BigIntegerField(verbose_name="قیمت قبلی محصول", null=True, blank=True)
    image = models.ImageField(upload_to='mysite/shop/static/shop/images', verbose_name='تصویر محصول', null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "محصول"
        verbose_name_plural= "محصولات"