from django.urls import path, include
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'barbers', BarberViewSet, basename='seat')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'schedules', ScheduleViewSet, basename='schedules')
router.register(r'booking', BookingViewSet, basename='booking')

urlpatterns = [
    path('api/v1/', include(router.urls)),
]
