import IconInput from '@/components/ui/icon-input';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import { IService } from '@/lib/type/types';
import { SearchIcon } from 'lucide-react';
import MastersServiceOption from './masters-service-option';
import { Button } from '@/components/ui/button';

interface IProps {
    masterId: number;
}

export default function MastersServiceList({ masterId }: IProps) {
    const { unfilteredServices } = useServices();
    const { filteredServices, handleInputChange, searchItem } = useSearch(unfilteredServices);

    return (
        <div className="flex flex-col justify-start gap-5">
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            <div>
                {filteredServices && filteredServices.length > 0 ? (
                    filteredServices.map((service: IService, index: number) => (
                        <MastersServiceOption name={service.name} index={index} key={index} />
                    ))
                ) : (
                    <SkeletonLoader className={'w-1/3 h-4'} />
                )}
            </div>

            {filteredServices && filteredServices.length > 0 && (
                <div>
                    <Button>Сохранить</Button>
                </div>
            )}
        </div>
    );
}
