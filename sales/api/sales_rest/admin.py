from django.contrib import admin
from .models import Customer, Sale, Salesperson


admin.site.register(Customer)
admin.site.register(Salesperson)
admin.site.register(Sale)
