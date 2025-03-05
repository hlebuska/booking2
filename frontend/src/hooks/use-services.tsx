import { getServices } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useServices() {
    const servicesQuery = useQuery({ queryKey: ['services'], queryFn: getServices });

    const unfilteredServices = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

    return { unfilteredServices };
}
