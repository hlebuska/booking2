from django.urls import path, include
from .views import *
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = routers.DefaultRouter()
router.register(r'barbers', BarberViewSet, basename='seat')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'schedules', ScheduleViewSet, basename='schedules')
router.register(r'booking', BookingViewSet, basename='booking')

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]
