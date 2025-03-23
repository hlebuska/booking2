'use client';

import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp } from 'lucide-react';
import { getGenericKeys, sortByFn } from '@/lib/utils';

interface IProps<T extends Record<string, any>> {
    items?: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function AdminList<T extends Record<string, any>>({ items, renderItem }: IProps<T>) {
    const keys = getGenericKeys(items);
    const [selectedSortKey, setSelectedSortKey] = useState<string>();
    const sortKey = keys.find((k) => k.key === selectedSortKey);

    const sortedItems = useMemo(() => {
        if (!items || !sortKey) return items ?? [];
        return sortByFn(items, sortKey);
    }, [items, sortKey]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mt-2 relative">
                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center ml-[9px] pointer-events-none w-4 h-4 text-zinc-500">
                    <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                </div>
                <Select onValueChange={(value) => setSelectedSortKey(value)}>
                    <SelectTrigger className="w-[30%] pl-8 text-zinc-500">
                        <SelectValue placeholder="По названию" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {keys.map((key, index) => (
                                <SelectItem className="pl-8" value={key.key as string} key={index}>
                                    <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                        <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                                    </div>
                                    {key.key as string}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {sortedItems && sortedItems.length > 0 ? (
                sortedItems.map((item, index) => renderItem(item, index))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
