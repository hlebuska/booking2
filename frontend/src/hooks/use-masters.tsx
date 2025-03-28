import { getMasters } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useMasters() {
    const {
        data,
        isLoading: isMastersLoading,
        isError: isMastersError,
    } = useQuery({
        queryKey: ['masters'],
        queryFn: getMasters,
    });

    const unfilteredMasters = useMemo(() => data ?? [], [data]);

    return { unfilteredMasters, isMastersLoading, isMastersError };
}
