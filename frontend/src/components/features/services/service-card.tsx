/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import { H5 } from '@/components/ui/typography';
import useStore from '@/hooks/use-store';

interface IProps {
    serviceId: number;
    name: string;
    description: string;
    duration: string;
    price: number;
}

export default function ServiceCard({ serviceId, name, description, duration, price }: IProps) {
    const router = useRouter();
    const { setServiceId, setMasterId } = useStore();

    const handleServiceSelect = () => {
        setServiceId(serviceId);
        setMasterId(null);
        router.push(`/branchSelect/serviceSelect/masterTimeSelect`);
    };

    return (
        <div
            className="flex flex-col gap-2 items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all hover:bg-gray-100 bg-muted outline-none outline-offset-0  hover:outline-gray-100 hover:outline-[6px] cursor-pointer  overflow-hidden"
            onClick={() => handleServiceSelect()}
        >
            <div className="w-full">
                <img
                    src="https://media.istockphoto.com/id/506514230/photo/beard-grooming.jpg?s=612x612&w=0&k=20&c=QDwo1L8-f3gu7mcHf00Az84fVU8oNpQLgvUw6eGPEkc="
                    alt="REPLACE LATER"
                    className="rounded-lg w-full h-52 object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <H5>{name}</H5>
                <p className="text-zinc-500">
                    {duration} · {description}
                </p>
                <H5 className="font-normal">{price} ₸</H5>
            </div>
        </div>
    );
}
