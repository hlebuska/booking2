import { SortOrderType } from '@/lib/types';
import { getGenericKeys, sortByFn } from '@/lib/utils';
import { useMemo, useState } from 'react';

export function useSorting<T extends Record<string, any>>(unsortedItems?: T[]) {
    const [selectedSortKey, setSelectedSortKey] = useState<string>();
    const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

    const keys = getGenericKeys(unsortedItems);
    const sortKey = keys.find((k) => k.key === selectedSortKey);

    const sortedItems = useMemo(() => {
        if (!unsortedItems || !sortKey) return unsortedItems ?? [];
        return sortByFn(unsortedItems, sortKey, sortOrder);
    }, [unsortedItems, sortKey, sortOrder]);

    return { sortedItems, selectedSortKey, setSelectedSortKey, setSortOrder, keys };
}
