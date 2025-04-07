'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

// 1) Define the days of the week
const weekdays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// 2) Generate time slots from 8:00 to 20:00 in 30-min increments
const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let hour = 8; hour <= 20; hour++) {
        slots.push(`${hour}:00`);
        if (hour < 20) {
            slots.push(`${hour}:30`);
        }
    }
    return slots;
};

const timeSlots = generateTimeSlots();

// 3) Type for schedule state: { [day]: { [time]: boolean } }
type ScheduleState = Record<string, Record<string, boolean>>;

export function MastersSchedule() {
    // Initialize schedule with all unchecked
    const [schedule, setSchedule] = useState<ScheduleState>(() => {
        const initialState: ScheduleState = {};
        weekdays.forEach((day) => {
            initialState[day] = {};
            timeSlots.forEach((time) => {
                initialState[day][time] = false;
            });
        });
        return initialState;
    });

    // Toggle time slot
    const toggleTimeSlot = (day: string, time: string) => {
        setSchedule((prev) => ({
            ...prev,
            [day]: {
                ...prev[day],
                [time]: !prev[day][time],
            },
        }));
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="h-full max-h-[70vh] overflow-y-auto pr-2">
                {/* Header row with weekdays */}
                <div className="grid grid-cols-8">
                    <div className="font-medium text-center text-muted-foreground p-2 border-l border-t">Время</div>
                    {weekdays.map((day) => (
                        <div key={day} className="font-medium text-center p-2 border-l border-t">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Time slot rows */}
                {timeSlots.map((time) => (
                    <div key={time} className="grid grid-cols-8">
                        {/* Left-most column: time label */}
                        <div className="font-medium text-sm text-muted-foreground p-2 flex items-center justify-center border-l border-t">
                            {time}
                        </div>

                        {/* One cell per weekday */}
                        {weekdays.map((day) => (
                            <TimeSlotCard
                                key={`${day}-${time}`}
                                day={day}
                                time={time}
                                checked={schedule[day][time]}
                                onChange={() => toggleTimeSlot(day, time)}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

interface TimeSlotCardProps {
    checked: boolean;
    onChange: () => void;
    time: string;
    day: string;
}

/**
 * Renders a single "time slot" cell containing:
 *  - Visually hidden checkbox
 *  - Label that becomes blue (or styled) when checked
 */
function TimeSlotCard({ time, day }: TimeSlotCardProps) {
    const checkboxId = `${day}-${time}`;
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(checked);
        return () => {};
    }, [checked]);
    return (
        <Card
            // Base Card styling
            className={cn('shadow-n one p-2 transition-colors rounded-none border-r-0 border-b-0')}
        >
            {/* Hidden checkbox for a11y */}
            <input
                id={checkboxId}
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="sr-only peer" // 'peer' lets us style the label based on :checked
            />

            {/* Label which changes style when 'peer' (the checkbox) is checked */}
            <label
                htmlFor={checkboxId}
                className={cn(
                    'flex items-center justify-between w-full h-full cursor-pointer hover:bg-accent',
                    // Tailwind class that triggers once the sibling checkbox is checked
                    'peer-checked:bg-primary/10 peer-checked:border peer-checked:border-primary'
                )}
            >
                {/* We can show the time or any text here */}
                <div className="hidden sm:block text-xs text-muted-foreground">{time}</div>
            </label>
        </Card>
    );
}
