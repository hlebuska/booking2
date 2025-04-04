import { getServices } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useServices() {
    const {
        data,
        isLoading: isServicesLoading,
        isError: isServicesError,
    } = useQuery({
        queryKey: ['services'],
        queryFn: getServices,
    });

    const unfilteredServices = useMemo(() => data ?? [], [data]);

    return { unfilteredServices, isServicesLoading, isServicesError };
}
