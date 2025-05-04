'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function MasterSchedulePreview() {
    const [activeCell] = useState<string | null>(null);
    //setActiveCell
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    // 48 half-hour slots 00:00-23:30
    const timeSlots = Array.from({ length: 48 }, (_, i) => i);

    const scheduleCells = days.flatMap((day) =>
        timeSlots.map((slot) => ({
            id: `${day}-${slot}`,
            day,
            slot,
            active: Math.random() > 0.8, // demo
        }))
    );

    // Hour labels → 0 h, 3 h, 6 h … 21 h
    const hourLabels = Array.from({ length: 9 }, (_, i) => i * 3);

    return (
        <div className="rounded-lg bg-white p-3 shadow-sm">
            {/* ───────── TOP HOUR LABELS ───────── */}
            <ul className="mb-1 ml-[22px] flex justify-between">
                {hourLabels.map((h) => (
                    <li key={h} className="flex  text-[10px] text-gray-400">
                        {h.toString().padStart(2, '0')}:00
                    </li>
                ))}
            </ul>

            {/* ───────── GRID (day labels + cells) ───────── */}
            <div className="grid grid-cols-[auto_1fr] gap-2">
                {/* Day labels */}
                <ul className="grid grid-rows-7 gap-px items-center">
                    {days.map((day) => (
                        <li key={day} className="text-[10px] leading-none text-gray-500">
                            {day}
                        </li>
                    ))}
                </ul>

                {/* Cells */}

                <ul className="grid grid-flow-col grid-rows-7 gap-px">
                    {scheduleCells.map((cell) => (
                        <div
                            key={cell.id}
                            className={cn(
                                'relative w-[10px] h-[10px] rounded-sm', // size
                                cell.active ? 'bg-blue-600' : 'bg-gray-200',
                                activeCell === cell.id && 'outline outline-1 outline-gray-400'
                            )}
                        ></div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

{
    /* <Tooltip key={cell.id}>
<TooltipTrigger
    className={cn(
        'relative w-[10px] h-[10px] rounded-sm', // size
        cell.active ? 'bg-blue-600' : 'bg-gray-200',
        activeCell === cell.id && 'outline outline-1 outline-gray-400'
    )}
/>
<TooltipContent>{cell.day}</TooltipContent>
</Tooltip> */
}
