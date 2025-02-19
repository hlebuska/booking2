'use client';
import { IService } from '@/lib/type/types';
import ServiceCard from './service-card';
import { H3 } from './typography';

interface IProps {
    services: IService[];
}

export default function ServiceSelectList({ services }: IProps) {
    return (
        <div>
            <div className="flex flex-col gap-4">
                <H3>Стрижка головы</H3>
                {services.map((service, index) => (
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
