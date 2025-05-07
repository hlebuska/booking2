from typing import Any, List
from bs.models import BarberService
from .cache import CacheService
from rest_framework.exceptions import PermissionDenied


class ServicesService(CacheService):
    def get_services(self, barber, is_authenticated: bool, user_type: str) -> List[dict]:
        """
        Возвращает список услуг для заданного барбера в зависимости от типа пользователя.
        
        :param barber: Объект барбера
        :param is_authenticated: Аутентифицирован ли пользователь
        :param user_type: Тип пользователя ('client' или 'admin')
        :return: Список словарей с данными услуг
        """
        if self._is_admin_request(is_authenticated, user_type):
            return self._get_services_for_admin(barber)
        return self._get_services_for_client(barber)

    def post_services(self, barber, services: List[Any]) -> None:
        """
        Назначает барберу новые услуги и очищает кэш.

        :param barber: Объект барбера
        :param services: Список новых услуг
        """
        barber.services.set(services)
        self._invalidate_cache(f"barber_{barber.id}_services_client")
        self._invalidate_cache(f"barber_{barber.id}_services_admin")

    # ------------------- Приватные методы -------------------

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

    def _get_services_for_admin(self, barber) -> List[dict]:
        """
        Получает все услуги с флагами выбора для администратора.
        """
        cache_key = f'barber_{barber.id}_services_admin'
        if cached := self._get_cached_data(cache_key):
            return cached

        all_services = BarberService.objects.all()
        selected_ids = set(barber.services.values_list('id', flat=True))

        services_data = [
            self._serialize_service(service, selected=service.id in selected_ids, include_selected=True)
            for service in all_services
        ]
        self._set_cached_data(cache_key, services_data)
        return services_data

    def _get_services_for_client(self, barber) -> List[dict]:
        """
        Получает только те услуги, которые привязаны к барберу (для клиента).
        """
        cache_key = f'barber_{barber.id}_services_client'
        if cached := self._get_cached_data(cache_key):
            return cached

        services_data = [
            self._serialize_service(service)
            for service in barber.services.all()
        ]
        self._set_cached_data(cache_key, services_data)
        return services_data

    def _serialize_service(self, service, selected: bool = False, include_selected: bool = False) -> dict:
        """
        Сериализует объект услуги в словарь.
        """
        data = {
            'id': service.id,
            'name': service.name,
            'description': service.description,
            'price': service.price,
        }
        if include_selected:
            data['selected'] = selected
        return data

    
