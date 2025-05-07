import logging
from django.db import transaction
from bs.models import BarberBooking, BarberTime

logger = logging.getLogger('myapp')

class BookingService:
    def _get_time_instance(self, barber, time):
        try:
            return BarberTime.objects.get(barber=barber, time_slot=time)
        except BarberTime.DoesNotExist:
            msg = f"Нет записи, соответствующей переданным параметрам."
            logger.error(msg)
            raise ValueError(msg)

    def create_booking(self, barber, time, name, phone_number, comment):
        time_instance = self._get_time_instance(barber, time)

        if not time_instance.is_available:
                barber_name = time_instance.barber.name
                time_slot = time_instance.time_slot.start_time.strftime("%H:%M")
                msg = f"Временной слот {time_slot} для парикмахера {barber_name} уже забронирован."
                logger.warning(msg)
                raise ValueError(msg)

        with transaction.atomic():
                time_instance.is_available = False
                time_instance.save()

                booking = BarberBooking.objects.create(
                    barber=barber,
                    time_slot=time,
                    name=name,
                    phone_number=phone_number,
                    comment=comment
                )

        logger.info(f"Бронирование успешно создано: {booking}")
        return booking



    def delete_booking(self, booking_id):
        try:
            with transaction.atomic():
                booking = BarberBooking.objects.select_related('barber', 'time_slot').get(id=booking_id)
                time_instance = BarberTime.objects.get(
                    barber=booking.barber,
                    time_slot=booking.time_slot
                )

                time_instance.is_available = True
                time_instance.save()

                booking.delete()

                msg = f"Бронирование #{booking_id} успешно удалено, и временной слот теперь доступен."
                logger.info(msg)
                return {"message": msg}

        except BarberBooking.DoesNotExist:
            logger.error(f"Бронирование #{booking_id} не найдено.")
            raise

        except BarberTime.DoesNotExist:
            logger.error(f"Временной слот для бронирования #{booking_id} не найден.")
            raise

        except Exception as e:
            logger.error(f"Ошибка при удалении бронирования #{booking_id}: {str(e)}")
            raise

