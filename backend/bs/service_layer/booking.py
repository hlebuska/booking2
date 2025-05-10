import logging
from typing import Optional, Dict
from django.db import transaction
from bs.models import BarberBooking, BarberTime, Barber

logger = logging.getLogger('myapp')


class BookingService:
    def _get_time_instance(self, barber: Barber, time) -> BarberTime:
        """
        Получает экземпляр временного слота для заданного барбера.

        :param barber: Объект барбера
        :param time: Временной слот
        :raises ValueError: Если временной слот не найден
        :return: Экземпляр BarberTime
        """
        try:
            return BarberTime.objects.get(barber=barber, time_slot=time)
        except BarberTime.DoesNotExist:
            msg = "Нет записи, соответствующей переданным параметрам."
            logger.error(msg)
            raise ValueError(msg)

    def create_booking(
        self,
        barber: Barber,
        time,
        name: str,
        phone_number: str,
        comment: Optional[str] = None
    ) -> BarberBooking:
        """
        Создает бронирование, если выбранный временной слот свободен.

        :param barber: Объект барбера
        :param time: Временной слот
        :param name: Имя клиента
        :param phone_number: Номер телефона клиента
        :param comment: Комментарий к бронированию
        :raises ValueError: Если слот уже занят или не существует
        :return: Созданный объект BarberBooking
        """
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

    def delete_booking(self, booking_id: int) -> Dict[str, str]:
        """
        Удаляет бронирование и освобождает соответствующий временной слот.

        :param booking_id: ID бронирования
        :raises Exception: В случае любых ошибок при удалении
        :return: Словарь с сообщением об успехе
        """
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
