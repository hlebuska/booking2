'use client';
import { H4 } from '@/components/ui/typography';
import { containerVariants, slotVariants } from '@/lib/animation-variants';

import { ISlot, SetNumberStateType } from '@/lib/types';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { motion } from 'motion/react';

interface IProps {
    schedules: ISlot[];
    selectedMaster: number | null;
    selectedSlot: number | null;
    setSelectedSlot: SetNumberStateType;
    isLoading: boolean;
    isError: boolean;
}

//Responsible for rendering and selecting slots
export default function SlotsListPage({ schedules, selectedMaster, setSelectedSlot, isLoading, isError }: IProps) {
    if (isError) {
        return <div>Error</div>;
    }

    const morningSlots = schedules?.filter((slot) => slot.is_available && slot.time < '1200');
    const daySlots = schedules?.filter((slot) => slot.is_available && slot.time >= '1200' && slot.time < '1800');
    const eveningSlots = schedules?.filter((slot) => slot.is_available && slot.time >= '1800');

    const renderSlots = (slots: ISlot[], title: string) => (
        <div>
            <H4 className="mb-3">{title}</H4>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-wrap gap-2 w-full"
            >
                {slots.map((slot) => (
                    <motion.div
                        variants={slotVariants}
                        key={slot.id}
                        className="flex-grow-0 flex-shrink-0 w-[calc(25%_-_0.5rem)] 
                                sm:w-[calc(20%_-_0.5rem)]
                                md:w-[calc(12.5%_-_0.5rem)]"
                    >
                        <RadioGroupItem id={slot.id} value={slot.id} className="peer hidden" />
                        <Label
                            htmlFor={slot.id}
                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 peer-aria-checked:bg-blue-500 peer-aria-checked:text-white"
                        >
                            {slot.time}
                        </Label>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );

    if (!selectedMaster) {
        return <></>;
    }

    if (morningSlots?.length == 0 && daySlots?.length == 0 && eveningSlots?.length == 0)
        return <p>У выбранного мастера нет доступных записей.</p>;

    return (
        <RadioGroup className="" onValueChange={(value) => setSelectedSlot(parseInt(value, 10))}>
            <div className="flex flex-col gap-3">
                {morningSlots?.length > 0 && renderSlots(morningSlots, 'Утро')}
                {daySlots?.length > 0 && renderSlots(daySlots, 'День')}
                {eveningSlots?.length > 0 && renderSlots(eveningSlots, 'Вечер')}
            </div>
        </RadioGroup>
    );
}
