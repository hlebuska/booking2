'use client';
import { Button } from '@/components/ui/button';
import useAuthGuard from '@/hooks/use-auth-guard';
import useConfirm from '@/hooks/use-confirm';
import useStore from '@/hooks/use-store';
import { deleteCookie } from '@/lib/cookies';
import { DoorOpen } from 'lucide-react';

export default function AdminSettings() {
    useAuthGuard();
    const { confirm } = useConfirm();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <Button
                onClick={() => {
                    confirm({
                        title: 'Вы уверены что хотите выйти из аккаунта?',
                        description: '',
                        onConfirm: async () => {
                            deleteCookie('access_token');
                            window.location.href = '/login';
                        },
                    });
                }}
            >
                Выйти из аккаунта <DoorOpen />
            </Button>
        </div>
    );
}
