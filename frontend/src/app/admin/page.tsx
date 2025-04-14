'use client';

import { Button } from '@/components/ui/button';
import useAuthGuard from '@/hooks/use-auth-guard';
import useStore from '@/hooks/use-store';

export default function AdminHome() {
    useAuthGuard();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            Admin content that will be here
            <Button
                onClick={() => {
                    useStore.getState().setAccessToken(null);
                    // useStore.getState().setRefreshToken?.(null);
                    console.log('Manually cleared tokens');
                }}
            >
                Clear Tokens
            </Button>
        </div>
    );
}
