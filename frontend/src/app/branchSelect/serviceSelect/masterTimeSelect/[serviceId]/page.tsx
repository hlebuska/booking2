'use client';
import BookingFormDialog from '@/components/feature/booking-form-dialog';
import SelectMasterDialog from '@/components/feature/select-master-dialog';
import SlotsList from '@/components/feature/slots-list';
import { H2 } from '@/components/ui/typography';
import { useBooking } from '@/hooks/use-booking';
import { useDialogState } from '@/hooks/use-dialog-state';
import useStore from '@/hooks/use-store';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MasterTimeSelectPage() {
    const { serviceId } = useParams();
    const serviceIdNumber = serviceId ? parseInt(serviceId as string, 10) : null;
    const router = useRouter();

    const { selectedMaster, selectedSlot, barbersQuery, scheduleQuery, setSelectedMaster, setSelectedSlot } =
        useBooking();

    useEffect(() => {
        //Invalid serviceId
        if (!serviceIdNumber) {
            router.push('/');
        }
    }, [serviceIdNumber, router]);

    const { serviceIdState, setServiceId } = useStore();
    console.log(serviceIdState);

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Новая запись</H2>

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
                selectedService={serviceIdNumber}
                selectedSlot={selectedSlot}
            />
        </div>
    );
}
