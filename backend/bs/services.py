from django.db import transaction
from django.core.exceptions import ObjectDoesNotExist

from .models import BarberBooking, BarberTime


class BookingService:
    @staticmethod
    def get_time_instance(barber_id, time_id):
        try:
            return BarberTime.objects.get(barber_id=barber_id, time_slot_id=time_id)
        except BarberTime.DoesNotExist:
            raise ValueError(f"У парикмахера с ID {barber_id} нет временного слота с ID {time_id}.")

    @staticmethod
    def create_booking(barber_id, time_id, name, phone_number, comment):
        time_instance = BookingService.get_time_instance(barber_id, time_id)
        print(time_instance)
        if not time_instance.is_available:
            barber_name = time_instance.barber.name
            time_slot = time_instance.time_slot.start_time.strftime("%H:%M")
            raise ValueError(f"Временной слот {time_slot} для парикмахера {barber_name} уже забронирован.")

        time_instance.is_available = False
        time_instance.save()

        booking = BarberBooking.objects.create(
            barber_id=barber_id,
            time_slot_id=time_id,
            name=name,
            phone_number=phone_number,
            comment=comment
        )

        return booking

    @staticmethod
    def delete_booking(booking_id):
        try:
            with transaction.atomic():
                booking = BarberBooking.objects.select_related('barber', 'time_slot').get(id=booking_id)
                time_instance = BarberTime.objects.get(
                    barber_id=booking.barber.id,
                    time_slots_id=booking.time_slot.id
                )
                time_instance.is_available = True
                time_instance.save()
                
                booking.delete()
                
                return {"message": f"Бронирование с ID {booking_id} успешно удалено, и временной слот теперь доступен."}

        except BarberBooking.DoesNotExist:
            return {"error": f"Бронирование с ID {booking_id} не найдено."}

        except BarberTime.DoesNotExist:
            return {"error": f"Временной слот для бронирования с ID {booking_id} не найден."}

        except Exception as e:
            print(f"Ошибка при удалении бронирования: {e}")
            return {"error": "Произошла ошибка при удалении бронирования."}
