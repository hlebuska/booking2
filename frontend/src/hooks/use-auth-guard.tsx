import { getCookie } from '@/lib/cookies';
import { verifyToken } from '@/lib/utils';
import { useEffect } from 'react';

export default function useAuthGuard() {
    const accessToken = getCookie('access_token');

    useEffect(() => {
        // 2. If we have hydrated but still no token, go to login

        if (!accessToken) {
            window.location.href = '/login';
            return;
        }

        try {
            const data = verifyToken(accessToken ? accessToken : '');
            console.log(data);
        } catch (error) {
            console.log(error);
            window.location.href = '/login';
        }
    }, [accessToken]);
}
