from rest_framework.exceptions import PermissionDenied
from typing import Any, List
from bs.models import BarberTime, TimeSlot
from .cache import CacheService
class SchedulesService(CacheService):
    def get_schedules(self, barber, is_authenticated: bool, user_type: str) -> List[dict]:
        """
        Возвращает список времени для заданного барбера в зависимости от типа пользователя.
        
        :param barber: Объект барбера
        :param is_authenticated: Аутентифицирован ли пользователь
        :param user_type: Тип пользователя ('client' или 'admin')
        :return: Список словарей с данными услуг
        """
        if self._is_admin_request(is_authenticated, user_type):
            return self._get_schedules_for_admin(barber)
        return self._get_schedules_for_client(barber)
    
    def post_schedules(self, barber, time_slots: List[Any]) -> None:
        """
        Назначает барберу новые временные слоты и очищает кэш.

        :param barber: Объект барбера
        :param time_slots: Список слотов
        """
        barber.time_slots.set(time_slots)
        self._invalidate_cache(f"barber_{barber.id}_schedules_client")
        self._invalidate_cache(f"barber_{barber.id}_schedules_admin")
    
    def _is_admin_request(self, is_authenticated: bool, user_type: str) -> bool:
        """
        Проверяет, является ли запрос админским и разрешён ли он.

        :raises PermissionDenied: Если пользователь не аутентифицирован, но требует админский доступ
        """
        if user_type == 'admin':
            if not is_authenticated:
                raise PermissionDenied("Требуется аутентификация для доступа к админским данным.")
            return True
        return False
    
    def _get_schedules_for_client(self, barber) -> List[dict]:
        """
        Получает только те временные слоты, которые привязаны к барберу (для клиента).
        """
        cache_key = f'barber_{barber.id}_schedules_client'
        if cached := self._get_cached_data(cache_key):
            return cached
        slots = BarberTime.objects.filter(barber=barber)
        schedules_data = [
            {
                'id': slot.time_slot.id,
                'time': slot.time_slot.start_time.strftime("%H:%M"),
                'is_available': slot.is_available
            }
            for slot in slots
        ]
        self._set_cached_data(cache_key, schedules_data)
        return schedules_data
    
    def _get_schedules_for_admin(self, barber) -> List[dict]:
        """
        Получает все временные слоты с флагами выбора для администратора.
        """
        cache_key = f'barber_{barber.id}_schedules_admin'
        if cached := self._get_cached_data(cache_key):
            return cached
        slots = TimeSlot.objects.all()
        selected_ids = set(barber.time_slots.values_list("id", flat=True))
        schedules_data = [
            {
                'id': slot.id,
                'time': slot.start_time.strftime("%H:%M"),
                'selected': slot.id in selected_ids
            }
            for slot in slots
        ]
        self._set_cached_data(cache_key, schedules_data)
        return schedules_data
    
