import { getServiceById } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useService(id: number | null) {
    const {
        data: service,
        isFetching: isServiceLoading,
        isError: isServiceError,
    } = useQuery({
        queryKey: ['service', id],
        queryFn: () => getServiceById(id!),
        enabled: id !== null,
    });

    // const service = useMemo(() => data ?? [], [data]);

    return { service, isServiceLoading, isServiceError };
}
