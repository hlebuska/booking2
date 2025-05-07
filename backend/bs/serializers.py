from decimal import Decimal, InvalidOperation
from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class BarberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Barber
        exclude = ['services', 'time_slots']


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarberService
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

    
class BookingSerializer(serializers.ModelSerializer):
    comment = serializers.CharField(required=False, allow_blank=True)
     
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
    

    

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)

    class Meta:
        model = User
        fields = ['username', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username = validated_data['username'],
            password = validated_data['password']
        )
        return user
    


class BarberBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BarberBooking
        fields = '__all__'  # или перечислите нужные поля
        # depth = 1