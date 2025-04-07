import logging
from django.db import transaction
from .models import BarberBooking, BarberTime

# Создаем логгер
logger = logging.getLogger('myapp')

class BookingService:
    @staticmethod
    def get_time_instance(barber, time):
        try:
            return BarberTime.objects.get(barber=barber, time_slot=time)
        except BarberTime.DoesNotExist:
            logger.error(f"Time slot {time} for barber {barber} does not exist.")
            raise ValueError(f"У парикмахера {barber} нет временного слота {time}.")

    @staticmethod
    def create_booking(barber, time, name, phone_number, comment):
        try:
            time_instance = BookingService.get_time_instance(barber, time)
            logger.debug(f"Booking time instance found: {time_instance}")

            if not time_instance.is_available:
                barber_name = time_instance.barber.name
                time_slot = time_instance.time_slot.start_time.strftime("%H:%M")
                logger.warning(f"Time slot {time_slot} for barber {barber_name} is already booked.")
                raise ValueError(f"Временной слот {time_slot} для парикмахера {barber_name} уже забронирован.")

            time_instance.is_available = False
            time_instance.save()

            booking = BarberBooking.objects.create(
                barber=barber,
                time_slot=time,
                name=name,
                phone_number=phone_number,
                comment=comment
            )

            logger.info(f"Booking created successfully: {booking}")
            return booking

        except Exception as e:
            logger.error(f"Error creating booking: {str(e)}")
            raise

    @staticmethod
    def delete_booking(booking_id):
        try:
            with transaction.atomic():
                booking = BarberBooking.objects.select_related('barber', 'time_slot').get(id=booking_id)
                time_instance = BarberTime.objects.get(
                    barber_id=booking.barber.id,
                    time_slot_id=booking.time_slot.id
                )
                time_instance.is_available = True
                time_instance.save()

                booking.delete()

                logger.info(f"Booking #{booking_id} deleted successfully and time slot is now available.")
                return {"message": f"Бронирование #{booking_id} успешно удалено, и временной слот теперь доступен."}

        except BarberBooking.DoesNotExist:
            logger.error(f"Booking #{booking_id} does not exist.")
            return {"error": f"Бронирование #{booking_id} не найдено."}

        except BarberTime.DoesNotExist:
            logger.error(f"Time slot for booking #{booking_id} does not exist.")
            return {"error": f"Временной слот для бронирования #{booking_id} не найден."}

        except Exception as e:
            logger.error(f"Error during booking deletion: {str(e)}")
            return {"error": "Произошла ошибка при удалении бронирования."}
