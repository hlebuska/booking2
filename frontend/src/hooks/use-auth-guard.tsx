import { useEffect } from 'react';
import useStore from './use-store';
import { verifyToken } from '@/lib/utils';

export default function useAuthGuard() {
    const { accessToken } = useStore();

    useEffect(() => {
        const checkToken = async () => {
            if (!accessToken) {
                window.location.href = '/login';
                return;
            }
        };

        try {
            const data = verifyToken(accessToken!);
        } catch (error) {
            console.log(error);
            window.location.href = '/login';
        }

        checkToken();
    }, [accessToken]);
}
