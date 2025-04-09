import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import SearchBar from '@/components/common/search-bar';
import { Button } from '@/components/ui/button';
import useMasterServices from '@/hooks/use-masters-services';
import { useSearch } from '@/hooks/use-search';
import { containerVariants } from '@/lib/animation-varitants';
import { IService } from '@/lib/types';
import { filterServices } from '@/lib/utils';
import { motion } from 'motion/react';
import MastersServiceOption from './masters-service-option';

interface IProps {
    masterId: number;
}

export default function MastersServiceList({ masterId }: IProps) {
    const { unfilteredServices, isMasterServicesLoading, isMastersServicesError } = useMasterServices(masterId);
    const { handleInputChange, searchItem, filteredData, notFoundText } = useSearch(unfilteredServices, filterServices);

    return (
        <div className="flex flex-col justify-start gap-4">
            <SearchBar value={searchItem} onChange={handleInputChange} />

            <ConditionalSkeletonLoader
                isLoading={isMasterServicesLoading}
                isError={isMastersServicesError}
                isEmpty={unfilteredServices.length == 0 && !!unfilteredServices}
                emptyMessage="В базе данных нет услуг."
            >
                {filteredData.length > 0 && (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        {filteredData.map((service: IService, index: number) => (
                            <MastersServiceOption
                                name={service.name}
                                index={index}
                                key={index}
                                checked={service.selected}
                            />
                        ))}
                    </motion.div>
                )}

                {notFoundText && <p className="text-zinc-500">{notFoundText}</p>}
                <div>
                    <Button>Сохранить</Button>
                </div>
            </ConditionalSkeletonLoader>
        </div>
    );
}
