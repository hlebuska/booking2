import { getMasters } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export default function useMasters() {
<<<<<<< HEAD
    const servicesQuery = useQuery({ queryKey: ['masters'], queryFn: getMasters });

    const unfilteredMasters = useMemo(() => servicesQuery.data ?? [], [servicesQuery.data]);

    return { unfilteredMasters };
=======
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
>>>>>>> da5c4fb1084e06efbcb8dc9a1ba05a58692ca6ec
}
