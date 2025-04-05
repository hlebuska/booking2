'use client';
import { H2, H4 } from '@/components/ui/typography';
import { CircleCheckBig } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className=" space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Запись</H2>
            <div className="flex  gap-3  items-center rounded-lg p-3 outline-none border overflow-hidden shadow-sm">
                <CircleCheckBig size={32} color="#16a34a" strokeWidth={2.25} />
                <H4 className="text-green-600">Вы успешно записаны</H4>
            </div>
        </div>
    );
}
