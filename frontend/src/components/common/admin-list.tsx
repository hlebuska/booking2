'use client';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useSorting } from '@/hooks/use-sorting';
import { SortOrderType } from '@/lib/type/types';
import { getGenericKeys, sortByFn, translateProp } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import SortingSelect from './sorting-select';

interface IProps<T extends Record<string, any>> {
    items?: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function AdminList<T extends Record<string, any>>({ items, renderItem }: IProps<T>) {
    const { sortedItems, selectedSortKey, setSelectedSortKey, setSortOrder, keys } = useSorting(items);

    return (
        <div className="flex flex-col gap-4">
            <SortingSelect
                keys={keys}
                setSelectedSortKey={setSelectedSortKey}
                selectedSortKey={selectedSortKey}
                setSortOrder={setSortOrder}
            />

            {sortedItems && sortedItems.length > 0 ? (
                sortedItems.map((item, index) => renderItem(item, index))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
