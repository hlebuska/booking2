import { useEffect } from 'react';
import useStore from './use-store';

export default function useAuthGuard() {
    const { accessToken } = useStore();

    useEffect(() => {
        const checkToken = async () => {
            if (!accessToken) {
                window.location.href = '/login';
                return;
            }
        };
        checkToken();
    }, [accessToken]);
}
