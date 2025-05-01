/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import { H5 } from '@/components/ui/typography';
import useStore from '@/hooks/use-store';
import { motion } from 'motion/react';
import { cardVariants } from '@/lib/animation-variants';

interface IProps {
    serviceId: number;
    name: string;
    description: string;
    duration: number;
    price: number;
}

export default function ServiceCard({ serviceId, name, description, duration, price }: IProps) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const router = useRouter();
    const { setServiceId, setMasterId } = useStore();

    const handleServiceSelect = () => {
        setServiceId(serviceId);
        setMasterId(null);
        router.push(`/branchSelect/serviceSelect/masterTimeSelect`);
    };

    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-col  items-start justify-between rounded-[10px] bordersm:p-4 text-left text-sm transition-all hover:bg-gray-50 bg-muted outline-none outline-offset-0  cursor-pointer  overflow-hidden border "
            onClick={() => handleServiceSelect()}
        >
            <div className="w-full">
                <img
                    src="https://media.istockphoto.com/id/506514230/photo/beard-grooming.jpg?s=612x612&w=0&k=20&c=QDwo1L8-f3gu7mcHf00Az84fVU8oNpQLgvUw6eGPEkc="
                    alt="REPLACE LATER"
                    className=" rounded-[7px] w-full h-52 object-cover rounded-b-none"
                />
            </div>
            <div className="flex flex-col gap-2 p-2">
                <H5>{name}</H5>
                <p className="text-zinc-500 break-normal">
                    {hours ? `${hours} ч.` : ''} {minutes} мин. · {description}
                </p>
                <H5 className="font-normal">{price} ₸</H5>
            </div>
        </motion.div>
    );
}
