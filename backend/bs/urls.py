from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'barbers', BarberViewSet, basename='seat')
router.register(r'booking', BookingViewSet, basename='booking')
router.register(r'services', ServiceViewSet, basename='service')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
