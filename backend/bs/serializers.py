from decimal import Decimal, InvalidOperation
from rest_framework import serializers
from .models import *

class BarberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Barber
        exclude = ['services']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarberService
        fields = '__all__'

    
class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarberBooking
        fields = '__all__'
    def validate_name(self, value):
        if len(value) < 2:
            raise serializers.ValidationError("Имя должно содержать не менее 2 символов.")
        return value
    def validate_phone_number(self, value):
        if not value.isdigit() or len(value) < 11:
            raise serializers.ValidationError("Неверный номер телефона. Он должен содержать не менее 11 цифр.")
        return value