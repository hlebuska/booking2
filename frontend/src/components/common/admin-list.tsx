'use client';

import SkeletonLoader from '@/components/ui/skeleton-loader';

interface IProps<T> {
    items?: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
}

export default function AdminList<T>({ items, renderItem }: IProps<T>) {
    return (
        <div className="flex flex-col gap-4">
            {items && items.length > 0 ? (
                items.map((item, index) => renderItem(item, index))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
