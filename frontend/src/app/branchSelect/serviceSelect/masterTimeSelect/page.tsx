'use client';
import BookingFormDialog from '@/app/branchSelect/serviceSelect/masterTimeSelect/components/booking-form-dialog';
import SelectMasterDialog from '@/app/branchSelect/serviceSelect/masterTimeSelect/components/select-master-dialog';
import SlotsList from '@/app/branchSelect/serviceSelect/masterTimeSelect/components/slots-list';
import { H2 } from '@/components/ui/typography';
import { useBooking } from '@/hooks/use-booking';
import useStore from '@/hooks/use-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import MasterCard from './components/master-card';

export default function MasterTimeSelectPage() {
    const router = useRouter();

    const {
        selectedMaster,
        selectedMasterName,
        selectedSlot,
        barbersQuery,
        scheduleQuery,
        setSelectedMaster,
        setSelectedSlot,
    } = useBooking();

    const { serviceIdState } = useStore();
    useEffect(() => {
        //Invalid serviceId
        if (!serviceIdState) {
            router.push('/branchSelect/serviceSelect');
        }
    }, [serviceIdState, router]);

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Новая запись</H2>

            {selectedMaster && <MasterCard id={selectedMaster} name={selectedMasterName} isSelected={false} />}
            <SelectMasterDialog
                barbers={barbersQuery.data}
                selectedMaster={selectedMaster}
                setSelectedMaster={setSelectedMaster}
            />

            <SlotsList
                schedules={scheduleQuery.data?.schedules}
                selectedMaster={selectedMaster}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
                isLoading={barbersQuery.isLoading || scheduleQuery.isLoading}
                isError={barbersQuery.isError || scheduleQuery.isError}
            />

            <BookingFormDialog
                selectedMaster={selectedMaster}
                selectedService={serviceIdState}
                selectedSlot={selectedSlot}
            />
        </div>
    );
}
