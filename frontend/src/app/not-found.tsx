'use client';
import { Button } from '@/components/ui/button';
import { H2 } from '@/components/ui/typography';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <Button onClick={() => router.back()}>
                <ChevronLeft /> Назад
            </Button>
            <H2>Что то пошло не так! Страница не найдена.</H2>
        </div>
    );
}
