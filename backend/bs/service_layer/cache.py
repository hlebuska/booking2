from typing import Any
from django.core.cache import cache
class CacheService:
    def _get_cached_data(self, key: str) -> Any:
        """
        Возвращает данные из кэша по ключу.
        """
        cached = cache.get(key)
        if cached:
            print(f"[Cache HIT] {key}")
        return cached

    def _set_cached_data(self, key: str, data: Any, timeout: int = 300) -> None:
        """
        Устанавливает данные в кэш.
        """
        print(f"[Cache SET] {key}")
        cache.set(key, data, timeout)

    def _invalidate_cache(self, key: str) -> None:
        """
        Удаляет данные из кэша.
        """
        cache.delete(key)
        print(f"[Cache INVALIDATED] {key}")