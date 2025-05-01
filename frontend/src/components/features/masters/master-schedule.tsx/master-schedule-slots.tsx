'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface CheckboxButtonListProps {
    className?: string;
}

export function MasterScheduleSlots({ className }: CheckboxButtonListProps) {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    // Generate time slots from 00:00 to 23:30 with 30-minute intervals
    const generateTimeSlots = () => {
        const timeSlots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                const timeString = `${formattedHour}:${formattedMinute}`;

                timeSlots.push({
                    id: timeString,
                    label: timeString,
                });
            }
        }
        return timeSlots;
    };

    const timeSlots = generateTimeSlots();

    // Split items into two columns, ensuring 12:00 is in the second column
    const firstColumnItems = timeSlots.slice(0, 24); // 00:00 to 11:30
    const secondColumnItems = timeSlots.slice(24); // 12:00 to 23:30

    const handleCheckedChange = (id: string, checked: boolean) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: checked,
        }));
    };

    const renderCheckboxItem = (item: { id: string; label: string }) => (
        <label
            key={item.id}
            htmlFor={item.id}
            className={cn(
                'flex items-center justify-between w-full px-4 py-3 rounded-md border cursor-pointer transition-colors mb-2',
                'hover:bg-muted/50 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                checkedItems[item.id] ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-background'
            )}
        >
            <span className="font-medium">{item.label}</span>
            <div className="flex items-center space-x-2">
                <Checkbox
                    id={item.id}
                    checked={checkedItems[item.id] || false}
                    onCheckedChange={(checked) => handleCheckedChange(item.id, checked as boolean)}
                    className="sr-only"
                />
                <div
                    className={cn(
                        'flex items-center justify-center w-5 h-5 rounded-sm border',
                        checkedItems[item.id] ? 'bg-primary-foreground border-primary-foreground' : 'border-primary'
                    )}
                >
                    {checkedItems[item.id] && <Check className="w-4 h-4 text-primary" />}
                </div>
            </div>
        </label>
    );

    return (
        <div className={cn('flex flex-col sm:flex-row gap-4', className)}>
            <div className="flex-1 space-y-2">{firstColumnItems.map(renderCheckboxItem)}</div>
            <div className="flex-1 space-y-2">{secondColumnItems.map(renderCheckboxItem)}</div>
        </div>
    );
}
