'use client';

import { useSorting } from '@/hooks/use-sorting';
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
            {sortedItems.map((item, index) => renderItem(item, index))}
        </div>
    );
}
