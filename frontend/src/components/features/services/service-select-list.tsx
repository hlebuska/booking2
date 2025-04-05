'use client';
import SortingSelect from '@/components/common/sorting-select';
import { useSorting } from '@/hooks/use-sorting';
import { IService } from '@/lib/type/types';
import { H3 } from '../../ui/typography';
import ServiceCard from './service-card';

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
                {sortedItems.map((service, index) => (
                    <ServiceCard
                        serviceId={service.id}
                        name={service.name}
                        description={service.description}
                        price={service.price}
                        duration={service.duration}
                        key={index}
                    />
                ))}
            </div>
        </div>
    );
}
