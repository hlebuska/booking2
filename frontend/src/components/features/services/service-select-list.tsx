'use client';
import { IService } from '@/lib/type/types';
import ServiceCard from './service-card';
import { H3 } from '../../ui/typography';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useSorting } from '@/hooks/use-sorting';
import SortingSelect from '@/components/common/sorting-select';

interface IProps {
    services?: IService[];
}

export default function ServiceSelectList({ services }: IProps) {
    const { sortedItems, selectedSortKey, setSelectedSortKey, setSortOrder, keys } = useSorting(services);

    return (
        <div>
            <div className="flex flex-col gap-4">
                <H3>Стрижка головы</H3>
                <SortingSelect
                    keys={keys}
                    setSelectedSortKey={setSelectedSortKey}
                    selectedSortKey={selectedSortKey}
                    setSortOrder={setSortOrder}
                />
                {sortedItems && sortedItems.length > 0 ? (
                    sortedItems.map((service, index) => (
                        <ServiceCard
                            serviceId={service.id}
                            name={service.name}
                            description={service.description}
                            price={service.price}
                            duration={service.duration}
                            key={index}
                        />
                    ))
                ) : (
                    <SkeletonLoader className={'w-1/2 h-6'} />
                )}
            </div>
        </div>
    );
}
