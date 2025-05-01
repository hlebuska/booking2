'use client';
import SortingSelect from '@/components/common/sorting-select';
import { useSorting } from '@/hooks/use-sorting';
import { containerVariants } from '@/lib/animation-variants';
import { IService } from '@/lib/types';
import { motion } from 'motion/react';
import ServiceCard from './service-card';

interface IProps {
    services?: IService[];
}

export default function ServiceSelectList({ services }: IProps) {
    const { sortedItems, selectedSortKey, setSelectedSortKey, setSortOrder, keys } = useSorting(services);

    return (
        sortedItems.length > 0 && (
            <motion.div variants={containerVariants} initial="hidden" animate="show" className="flex flex-col gap-4">
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
            </motion.div>
        )
    );
}
