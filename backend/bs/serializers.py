from decimal import Decimal, InvalidOperation
from rest_framework import serializers
from .models import *
class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['start_time']

class BarberTimeSerializer(serializers.ModelSerializer):
    time_slot = serializers.CharField(source='time_slots.start_time')

    class Meta:
        model = BarberTime
        fields = ['id','time_slot', 'is_available']


class BarberSerializer(serializers.ModelSerializer):
    # schedules = BarberTimeSerializer(many=True)

    class Meta:
        model = Barber
        # fields = '__all__'
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