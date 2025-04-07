import { getMastersServices } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useMasterServices(masterId: number) {
    const {
        data,
        isLoading: isMasterServicesLoading,
        isError: isMastersServicesError,
    } = useQuery({
        queryKey: ['masterServices', masterId],
        queryFn: () => getMastersServices(masterId),
    });

    const unfilteredServices = useMemo(() => data ?? [], [data]);
    return { unfilteredServices, isMasterServicesLoading, isMastersServicesError };
}
