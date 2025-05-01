import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import SearchBar from '@/components/common/search-bar';
import { Button } from '@/components/ui/button';
import useMasterServices from '@/hooks/use-masters-services';
import { useSearch } from '@/hooks/use-search';
import { containerVariants } from '@/lib/animation-varitants';
import { ChangedServicesMap, IService } from '@/lib/types';
import { filterServices, queryClient, updateMasterServices } from '@/lib/utils';
import { motion } from 'motion/react';
import MastersServiceOption from './masters-service-option';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useToast } from '@/hooks/use-toast';

interface IProps {
    masterId: number;
}

export default function MastersServiceList({ masterId }: IProps) {
    const { unfilteredServices, isMasterServicesLoading, isMastersServicesError } = useMasterServices(masterId);
    const { handleInputChange, searchItem, filteredData, notFoundText } = useSearch(unfilteredServices, filterServices);
    const { toast } = useToast();

    //Local state
    const [services, setServices] = useState<IService[]>([]);
    const [changedServices, setChangedServices] = useState<Record<number, boolean>>({});

    useEffect(() => {
        if (unfilteredServices.length) {
            setServices(unfilteredServices);
            setChangedServices({}); // reset on load
        }
    }, [unfilteredServices]);

    const toggleService = (id: number) => {
        setServices((prev) =>
            prev.map((service) => (service.id === id ? { ...service, selected: !service.selected } : service))
        );
        setChangedServices((prev) => {
            const updated = { ...prev };
            const service = services.find((s) => s.id == id);

            if (updated[id] !== undefined) {
                delete updated[id]; // remove the ID if it's already tracked
            } else {
                updated[id] = !service?.selected; //     add the ID if it's newly changed
            }

            return updated;
        });
    };

    const mutation = useMutation<void, unknown, ChangedServicesMap>({
        mutationFn: (data) => {
            return updateMasterServices(masterId, { services: data });
        },
        onSuccess: (data) => {
            toast({
                variant: 'success',
                title: 'Услуга успешно обновлена.',
                description: `Обновление услуг мастера прошло успешно.`,
            });
            queryClient.invalidateQueries({ queryKey: ['service'] });
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка.',
                    description: error.response?.data.error,
                    duration: 2000,
                });
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Ошибка.',
                    description: 'Что-то пошло не так.',
                    duration: 2000,
                });
            }
        },
    });

    return (
        <div className="flex flex-col justify-start gap-4">
            <SearchBar value={searchItem} onChange={handleInputChange} />

            <ConditionalSkeletonLoader
                isLoading={isMasterServicesLoading}
                isError={isMastersServicesError}
                isEmpty={unfilteredServices.length == 0 && !!unfilteredServices}
                emptyMessage="В базе данных нет услуг."
            >
                {services.length > 0 && (
                    <motion.div variants={containerVariants} initial="hidden" animate="show">
                        {services.map((service: IService, index: number) => (
                            <MastersServiceOption
                                name={service.name}
                                index={index}
                                key={index}
                                checked={service.selected}
                                onChange={() => toggleService(service.id)}
                            />
                        ))}
                    </motion.div>
                )}

                {notFoundText && <p className="text-zinc-500">{notFoundText}</p>}
                <div>
                    <Button
                        disabled={Object.keys(changedServices).length === 0}
                        onClick={() => mutation.mutate(changedServices)}
                    >
                        Сохранить
                    </Button>
                </div>
            </ConditionalSkeletonLoader>
        </div>
    );
}

//() => updateMasterServices(6, { services: { 1: true } })
