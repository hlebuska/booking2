'use client';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import { Separator } from '@/components/ui/separator';
import { Body1, H2, H4 } from '@/components/ui/typography';
import useMaster from '@/hooks/use-master';
import { CircleCheckBig } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const masterId = Number(searchParams.get('barberId'));
    const comment = searchParams.get('comment');
    const timeSlot = searchParams.get('timeSlot');
    console.log(masterId);

    const { master, isMasterLoading, isMasterError } = useMaster(masterId);
    console.log(master);

    return (
        <div className=" space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Запись</H2>
            <div className="flex  gap-3  items-center rounded-lg p-3 outline-none border overflow-hidden shadow-sm">
                <CircleCheckBig size={32} color="#16a34a" strokeWidth={2.25} />
                <H4 className="text-green-600">Вы успешно записаны</H4>
            </div>
            <ConditionalSkeletonLoader isLoading={isMasterLoading} isError={isMasterError}>
                <div className="flex flex-col gap-3 rounded-lg p-3 outline-none border overflow-hidden shadow-sm">
                    <Body1 className="border-b py-2">Мастер: {master?.name}</Body1>
                    <Body1 className="border-b py-2">Время: </Body1>
                    <Body1 className="border-b py-2">Ваш комментарий: {comment}</Body1>
                </div>
            </ConditionalSkeletonLoader>
        </div>
    );
}
