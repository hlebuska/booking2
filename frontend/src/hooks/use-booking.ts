import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMasters, getScheduleByMaster } from '@/lib/utils';
import useStore from './use-store';

export function useBooking() {
    const { masterIdState, setMasterId } = useStore();
    const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);

    const barbersQuery = useQuery({ queryKey: ['barbers'], queryFn: getMasters });
    const scheduleQuery = useQuery({
        queryKey: ['schedule', masterIdState],
        queryFn: () => (masterIdState ? getScheduleByMaster(masterIdState, 'client') : { schedules: [] }),
        enabled: !!masterIdState,
    });

    const selectedMaster =
        barbersQuery.data && Array.isArray(barbersQuery.data)
            ? barbersQuery.data.find((barber) => barber.id === masterIdState)
            : null;

    const selectedMasterName = selectedMaster ? selectedMaster.name : '';

    return {
        selectedMaster: masterIdState,
        selectedMasterName,
        setSelectedMaster: setMasterId,
        selectedSlot: selectedSlotId,
        setSelectedSlot: setSelectedSlotId,
        barbersQuery,
        scheduleQuery,
    };
}

export function useSelectMaster() {}
