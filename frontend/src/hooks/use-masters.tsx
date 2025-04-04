import { getMasters } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useMasters() {
    const servicesQuery = useQuery({ queryKey: ['masters'], queryFn: getMasters });

    const unfilteredMasters = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

    return { unfilteredMasters };
}
