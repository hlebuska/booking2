
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import AuthenticationFailed

import logging
from django.core.cache import cache

from .models import *
from .serializers import *
from .service_layer.booking import BookingService
from .service_layer.services import ServicesService
from .service_layer.schedules import SchedulesService

logger = logging.getLogger('myapp')

class BarberViewSet(viewsets.ModelViewSet):
    queryset = Barber.objects.all()
    serializer_class = BarberSerializer

    @action(methods=['get', 'post'], detail=True)
    def schedules(self, request, pk=None):
        barber = self.get_object()
        user_type = request.query_params.get("user_type", "client")

        if request.method == 'GET':
            services_data = SchedulesService().get_schedules(barber, request.user.is_authenticated, user_type)
            return Response(services_data)

        elif request.method == 'POST':
            try:
                SchedulesService().post_schedules(barber, request.data.get('time_slots', []))
            except Exception as e:
                logger.error(f"Ошибка при назначении слотов: {e}")
                return Response({"status": "Не удалось назначить временные слоты"}, status=404)


            return Response({"status": "Временные слоты успешно назначены"}, status=201)

    
    @action(methods=['get', 'post'], detail=True)
    def services(self, request, pk=None):
        barber = self.get_object()
        user_type = request.query_params.get("user_type", "client").lower()

        if request.method == 'GET':
            services_data = ServicesService().get_services(barber, request.user.is_authenticated, user_type)
            return Response(services_data)

        elif request.method == 'POST':
            try:
                ServicesService().post_services(barber, request.data.get('services', []))
            except Exception as e:
                logger.error(f"Ошибка при назначении услуг: {e}")
                return Response({"status": f"Не удалось назначить услуги для {barber}"}, status=404)


            return Response({"status": f"Услуги успешно назначены для {barber}"}, status=201)

        
    @action(methods=['post'], detail=True, url_path='set-services-status')
    def set_services_status(self, request, pk=None):
        barber = self.get_object()
        service_map = request.data.get('services', {})

        if not isinstance(service_map, dict):
            return Response({'error': 'Ожидался словарь "services" в формате {id: boolean}'}, status=400)


        try:
            for service_id_str, should_be_selected in service_map.items():
                try:
                    service_id = int(service_id_str)
                    service = BarberService.objects.get(id=service_id)

                    if should_be_selected:
                        barber.services.add(service)
                    else:
                        barber.services.remove(service)
                except (ValueError, BarberService.DoesNotExist):
                    continue 

            cache.delete(f'barber_{barber.id}_services_client')
            cache.delete(f'barber_{barber.id}_services_admin')

            return Response({'status': 'Услуги обновлены'}, status=200)

        except Exception as e:
            logger.error(f"Ошибка при обновлении услуг для парикмахера {barber.id}: {e}")
            return Response({'error': str(e)}, status=400)



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
        try:
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                barber = serializer.validated_data['barber']
                time = serializer.validated_data['time_slot']
                name = serializer.validated_data['name']
                phone_number = serializer.validated_data['phone_number']
                comment = serializer.validated_data.get('comment', '')

                logger.debug(f"Попытка создать бронирование для парикмахера {barber}, время {time}, имя {name}")

                booking = BookingService().create_booking(
                        barber=barber,
                        time=time,
                        name=name,
                        phone_number=phone_number,
                        comment=comment
                    )
                serializer = BarberBookingSerializer(booking)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ValueError as ve:
            logger.warning(f"Ошибка бизнес-логики при создании бронирования: {str(ve)}")
            return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            logger.error(f"Неизвестная ошибка при создании бронирования: {str(e)}")
            return Response({"error": "Произошла непредвиденная ошибка."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    def destroy(self, request, *args, **kwargs):
        booking_id = kwargs.get('pk')
        logger.debug(f"Попытка удалить бронирование с ID {booking_id}")

        try:
            result = BookingService().delete_booking(booking_id=booking_id)
            logger.info(f"Бронирование с ID {booking_id} успешно удалено")
            return Response(result, status=status.HTTP_200_OK)

        except BarberBooking.DoesNotExist:
            msg = f"Бронирование с ID {booking_id} не найдено."
            logger.warning(msg)
            return Response({"error": msg}, status=status.HTTP_404_NOT_FOUND)

        except BarberTime.DoesNotExist:
            msg = f"Временной слот для бронирования с ID {booking_id} не найден."
            logger.warning(msg)
            return Response({"error": msg}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            msg = f"Непредвиденная ошибка при удалении бронирования с ID {booking_id}: {str(e)}"
            logger.error(msg)
            return Response({"error": "Произошла непредвиденная ошибка."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




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
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Неверные учетные данные'}, status=status.HTTP_401_UNAUTHORIZED)

        data = serializer.validated_data
        refresh_token = data.get('refresh')
        access_token = data.get('access')

        response = Response({'access': access_token}, status=status.HTTP_200_OK)
        response.set_cookie(
            key='refresh_token',
            value=refresh_token,
            httponly=True,
            secure=True, 
            samesite='Lax',
            path='/',
            max_age=1 * 24 * 60 * 60 
        )

        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh = request.COOKIES.get('refresh_token')

        if not refresh:
            raise AuthenticationFailed('Отсутствует refresh токен в cookies')

        serializer = self.get_serializer(data={'refresh': refresh})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)