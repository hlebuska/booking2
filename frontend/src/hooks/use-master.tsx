import { getMasterById } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';

export default function useMaster(id: number | null) {
    const {
        data: master,
        isFetching: isMasterLoading,
        isError: isMasterError,
    } = useQuery({
        queryKey: ['master', id],
        queryFn: () => getMasterById(id!),
        enabled: id !== null,
    });

    return { master, isMasterLoading, isMasterError };
}
