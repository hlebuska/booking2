
from rest_framework import generics, mixins, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import *
from .serializers import BarberSerializer, BookingSerializer, ServiceSerializer, ScheduleSerializer, RegisterSerializer
from .services import BookingService
from .service_layer.services import ServicesService
from .service_layer.schedules import SchedulesService
import logging
from django.core.cache import cache
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.exceptions import AuthenticationFailed



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

        if request.method == 'GET':
            services_data = SchedulesService().get_schedules(barber, request.user.is_authenticated, user_type)
            return Response(services_data)

        elif request.method == 'POST':
            try:
               SchedulesService().post_schedules(barber, request.data.get('time_slots', []))
            except Exception as e:
                logger.error(f"Ошибка при назначении слотов: {e}")
                return Response({"status": "unable assign time slots"}, status=404)

            return Response({"status": "successfully assigned time slots"}, status=201)

    
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
                return Response({"status": f"unable assign services to {barber}"}, status=404)

            return Response({"status": f"successfully assigned services to {barber}"}, status=201)
        
    @action(methods=['post'], detail=True, url_path='set-services-status')
    def set_services_status(self, request, pk=None):
        barber = self.get_object()
        service_map = request.data.get('services', {})

        if not isinstance(service_map, dict):
            return Response({'error': 'Expected "services" to be a dictionary of {id: boolean}'}, status=400)

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

            return Response({'status': 'services updated'}, status=200)

        except Exception as e:
            logger.error(f"Error updating services for barber {barber.id}: {e}")
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
    

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

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
            raise AuthenticationFailed('No refresh token in cookies')

        serializer = self.get_serializer(data={'refresh': refresh})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)