import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import useMasterServices from '@/hooks/use-masters-services';
import { useSearch } from '@/hooks/use-search';
import { IService } from '@/lib/type/types';
import { SearchIcon } from 'lucide-react';
import MastersServiceOption from './masters-service-option';
import { filterServices } from '@/lib/utils';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';

interface IProps {
    masterId: number;
}

export default function MastersServiceList({ masterId }: IProps) {
    const { unfilteredServices, isMasterServicesLoading, isMastersServicesError } = useMasterServices(masterId);
    const { handleInputChange, searchItem, filteredData } = useSearch(unfilteredServices, filterServices);

    return (
        <div className="flex flex-col justify-start gap-5">
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />

            <ConditionalSkeletonLoader
                isLoading={isMasterServicesLoading}
                isError={isMastersServicesError}
                isEmpty={filteredData.length == 0 && !!filteredData}
                emptyMessage="В базе данных нет услуг."
            >
                {filteredData.map((service: IService, index: number) => (
                    <MastersServiceOption name={service.name} index={index} key={index} />
                ))}
                <div>
                    <Button>Сохранить</Button>
                </div>
            </ConditionalSkeletonLoader>

            {/* 
            {filteredData && filteredData.length > 0 && (
                 <div>
                    <Button>Сохранить</Button>
                </div>
            )} */}
        </div>
    );
}
