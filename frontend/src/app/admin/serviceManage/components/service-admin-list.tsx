import { IService } from '@/lib/type/types';
import ServiceAdminCard from './service-admin-card';
import SkeletonLoader from '@/components/ui/skeleton-loader';

interface IProps {
    services?: IService[];
}

export default function ServiceAdminList({ services }: IProps) {
    return (
        <div className="flex flex-col gap-3">
            {services && services.length > 0 ? (
                services.map((service, index) => (
                    <ServiceAdminCard
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
    );
}
