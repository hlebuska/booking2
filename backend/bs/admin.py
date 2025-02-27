from django.contrib import admin
from .models import Barber, BarberBooking, BarberTime, BarberService
# Register your models here.
admin.site.register(BarberBooking)
admin.site.register(Barber)
admin.site.register(BarberTime)
admin.site.register(BarberService)
