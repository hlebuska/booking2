'use client';

import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDown, ArrowDownUp, ArrowUp } from 'lucide-react';
import { getGenericKeys, sortByFn } from '@/lib/utils';
import { SortOrderType } from '@/lib/type/types';

interface IProps<T extends Record<string, any>> {
    items?: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function AdminList<T extends Record<string, any>>({ items, renderItem }: IProps<T>) {
    const [selectedSortKey, setSelectedSortKey] = useState<string>();
    const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');

    const keys = getGenericKeys(items);
    const sortKey = keys.find((k) => k.key === selectedSortKey);

    const sortedItems = useMemo(() => {
        if (!items || !sortKey) return items ?? [];
        return sortByFn(items, sortKey);
    }, [items, sortKey]);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2">
                {/* Sorting By Select */}
                <div className="flex items-center gap-2 mt-2 relative w-[30%]">
                    <Select defaultValue="no" onValueChange={(value) => setSelectedSortKey(value)}>
                        <SelectTrigger className=" gap-2 text-zinc-500">
                            <SelectValue placeholder="Без сортировки" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={'no'}>Без сортировки</SelectItem>
                                {keys.map((key, index) => (
                                    <SelectItem value={key.key as string} key={index}>
                                        {key.key as string}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Asc/Desc Select */}
                <div className="flex items-center gap-2 mt-2 relative">
                    <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center ml-[9px] pointer-events-none w-4 h-4 text-zinc-500"></div>

                    <Select
                        defaultValue="asc"
                        onValueChange={(value) => setSortOrder(value as SortOrderType)}
                        disabled={selectedSortKey === 'no'}
                    >
                        <SelectTrigger className="pl-8 gap-2 text-zinc-500">
                            <SelectValue placeholder="По возр." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem className="pl-8" value={'asc'}>
                                    <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                        <ArrowUp color="#85858d" strokeWidth={1.75} />
                                    </div>
                                    По возр.
                                </SelectItem>
                                <SelectItem className="pl-8" value={'desc'}>
                                    <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                        <ArrowDown color="#85858d" strokeWidth={1.75} />
                                    </div>
                                    По убыв.
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {sortedItems && sortedItems.length > 0 ? (
                sortedItems.map((item, index) => renderItem(item, index))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
