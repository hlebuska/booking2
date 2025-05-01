'use client';

import { useSorting } from '@/hooks/use-sorting';

import { motion } from 'motion/react';
import SortingSelect from './sorting-select';
import { containerVariants } from '@/lib/animations';

interface IProps<T extends Record<string, any>> {
    items?: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function AdminList<T extends Record<string, any>>({ items, renderItem }: IProps<T>) {
    const { sortedItems, selectedSortKey, setSelectedSortKey, setSortOrder, keys } = useSorting(items);

    return (
        sortedItems.length > 0 && (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
                <SortingSelect
                    keys={keys}
                    setSelectedSortKey={setSelectedSortKey}
                    selectedSortKey={selectedSortKey}
                    setSortOrder={setSortOrder}
                />
                {sortedItems.map((item, index) => renderItem(item, index))}
            </motion.div>
        )
    );
}
