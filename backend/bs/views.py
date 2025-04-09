
from rest_framework import generics, mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import *
from .serializers import BarberSerializer, BookingSerializer, ServiceSerializer, ScheduleSerializer, RegisterSerializer
from .services import BookingService
import logging
from django.core.cache import cache

logger = logging.getLogger('myapp')
cached_slots = dict()
cached_services = dict()

class BarberViewSet(viewsets.ModelViewSet):
    queryset = Barber.objects.all()
    serializer_class = BarberSerializer

    @action(methods=['get', 'post'], detail=True)
    def schedules(self, request, pk=None):
        barber = self.get_object()
        user_type = request.query_params.get("user_type", "client")


        if user_type == "admin" and not request.user.is_authenticated:
            return Response(
                {"error": "You must be authenticated to access admin data."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if request.method == 'GET':
            cached_data = cache.get(f'barber_{barber.id}_schedules_{user_type}')
            if cached_data:
                logger.info(f"Данные о расписании барбера {barber} для {user_type} извлечены из кэша.")
                return Response(cached_data)

            if user_type == "client":
                slots = BarberTime.objects.filter(barber=barber)
                schedule_data = [
                    {
                        'id': slot.time_slot.id,
                        'time': slot.time_slot.start_time.strftime("%H:%M"),
                        'is_available': slot.is_available
                    }
                    for slot in slots
                ]

            elif user_type == "admin":
                slots = TimeSlot.objects.all()
                selected_ids = set(barber.time_slots.values_list("id", flat=True))
                schedule_data = [
                    {
                        'id': slot.id,
                        'time': slot.start_time.strftime("%H:%M"),
                        'selected': slot.id in selected_ids
                    }
                    for slot in slots
                ]

            cache.set(f'barber_{barber.id}_schedules_{user_type}', schedule_data, timeout=300)
            logger.info(f"Данные о расписании барбера {barber} для {user_type} сохранены в кэш.")
            return Response(schedule_data)

        elif request.method == 'POST':
            time_ids = request.data.get('time_slots', [])
            try:
                barber.time_slots.set(time_ids)
                cache.delete(f'barber_{barber.id}_schedules_client')
                cache.delete(f'barber_{barber.id}_schedules_admin')
                logger.info(f"Кэш с расписанием удален")
            except Exception as e:
                logger.error(f"Ошибка при назначении слотов: {e}")
                return Response({"status": "unable assign time slots"}, status=404)

            return Response({"status": "successfully assigned time slots"}, status=201)

    
    @action(methods=['get', 'post'], detail=True)
    def services(self, request, pk=None):
        barber = self.get_object()
        user_type = request.query_params.get("user_type", "client")


        if user_type == "admin" and not request.user.is_authenticated:
            return Response(
                {"error": "You must be authenticated to access admin data."},
                status=status.HTTP_401_UNAUTHORIZED
            )

        if request.method == 'GET':
            cache_key = f'barber_{barber.id}_services_{user_type}'
            cached_data = cache.get(cache_key)

            if cached_data:
                logger.info(f"Данные об услугах барбера {barber} для {user_type} извлечены из кэша.")
                return Response(cached_data)

            if user_type == 'client':
                barber_services = barber.services.all()
                selected_services = []
            elif user_type == 'admin':
                barber_services = BarberService.objects.all()
                selected_services = set(barber.services.values_list('id', flat=True))

            services_data = [
                {
                    'id': service.id,
                    'name': service.name,
                    'description': service.description,
                    'price': service.price,
                    'selected': service.id in selected_services if user_type == 'admin' else None
                }
                for service in barber_services
            ]

            if services_data:
                cache.set(cache_key, services_data, timeout=300)
                logger.info(f"Данные об услугах барбера {barber} для {user_type} сохранены в кэш.")

            return Response(services_data)

        elif request.method == 'POST':
            list_of_service_ids = request.data.get('services', [])
            try:
                barber.services.set(list_of_service_ids)
                cache.delete(f'barber_{barber.id}_services_client')
                cache.delete(f'barber_{barber.id}_services_admin')
                logger.info(f"Кэш с услугами удален")
            except Exception as e:
                logger.error(f"Ошибка при назначении услуг: {e}")
                return Response({"status": f"unable assign services to {barber}"}, status=404)

            return Response({"status": f"successfully assigned services to {barber}"}, status=201)


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = BarberService.objects.all()
    serializer_class = ServiceSerializer

    @action(methods=['get'], detail = True)
    def barbers(self, request, pk = None):
        service = self.get_object()
        barbers_list = service.barbers.all()
        return Response([
            {
                'id':barber.id,
                'name': barber.name,
            }
            for barber in barbers_list
            ])
        


class BookingViewSet(viewsets.ModelViewSet):
    queryset = BarberBooking.objects.all()
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            barber = serializer.validated_data['barber']
            time = serializer.validated_data['time_slot']
            name = serializer.validated_data['name']
            phone_number = serializer.validated_data['phone_number']
            comment = serializer.validated_data.get('comment', '')

            logger.debug(f"Attempting to create booking for barber {barber}, time {time}, name {name}")

            try:
                booking = BookingService.create_booking(
                    barber=barber,
                    time=time,
                    name=name,
                    phone_number=phone_number,
                    comment=comment
                )
                logger.info(f"Booking created: {booking}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            except ValueError as e:
                logger.error(f"Failed to create booking: {str(e)}")
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, *args, **kwargs):
        booking_id = kwargs.get('pk')

        logger.debug(f"Attempting to delete booking with ID {booking_id}")

        try:
            result = BookingService.delete_booking(booking_id=booking_id)
            logger.info(f"Successfully deleted booking with ID {booking_id}")
            return Response(result, status=status.HTTP_200_OK)

        except ValueError as e:
            logger.error(f"Failed to delete booking with ID {booking_id}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_404_NOT_FOUND)



class ScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = ScheduleSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"message":"Пользователь создан"})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)