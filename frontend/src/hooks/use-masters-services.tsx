import { getMastersServices } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useMasterServices(masterId: number) {
    const servicesQuery = useQuery({
        queryKey: ['masterServices', masterId],
        queryFn: () => getMastersServices(masterId),
    });

    const unfilteredMasters = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

    return { unfilteredMasters };
}
