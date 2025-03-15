import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink } from 'lucide-react';
import MastersServiceOption from './masters-service-option';
import { IService } from '@/lib/type/types';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import useServices from '@/hooks/use-services';

interface IProps {
    masterId: number;
}

export default function MastersServiceList({ masterId }: IProps) {
    const { unfilteredServices } = useServices();

    return (
        <div>
            {unfilteredServices && unfilteredServices.length > 0 ? (
                unfilteredServices.map((service: IService, index: number) => (
                    <MastersServiceOption name={service.name} index={index} key={index} />
                ))
            ) : (
                <SkeletonLoader className={'w-1/3 h-4'} />
            )}
        </div>
    );
}
