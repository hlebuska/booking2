import { getServices } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export default function useServices() {
    const servicesQuery = useQuery({ queryKey: ['services'], queryFn: getServices });

    return { unfilteredServices: servicesQuery.data ?? [] };
}
