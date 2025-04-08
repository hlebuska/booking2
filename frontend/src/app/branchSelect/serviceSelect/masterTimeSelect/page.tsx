'use client';
import MasterDialogTrigger from '@/components/features/masters/master-dialog-trigger';
import SelectMasterList from '@/components/features/masters/select-master-list';
import SlotsList from '@/components/features/booking/slots-list';
import BookingForm from '@/components/forms/booking-form';
import { Button } from '@/components/ui/button';

import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import { H2 } from '@/components/ui/typography';
import { useBooking } from '@/hooks/use-booking';
import { useDialogStore } from '@/hooks/use-dialog-store';
import useService from '@/hooks/use-service';
import useStore from '@/hooks/use-store';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function MasterTimeSelectPage() {
    const router = useRouter();
    const { openDialog, setOpen } = useDialogStore();

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
        console.log(serviceIdState);
    }, [serviceIdState, router]);

    const { service, isServiceLoading, isServiceError } = useService(serviceIdState);

    const closeDialog = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    useEffect(() => {
        closeDialog();
    }, [selectedMaster, closeDialog]);

    console.log(service);

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <ConditionalSkeletonLoader isLoading={isServiceLoading} isError={isServiceError} className="h-3">
                <H2>{service?.name}</H2>
            </ConditionalSkeletonLoader>

            <MasterDialogTrigger
                name={selectedMasterName}
                id={selectedMaster}
                onClick={() =>
                    openDialog({
                        content: (
                            <SelectMasterList
                                masters={barbersQuery.data}
                                setMasterId={setSelectedMaster}
                                selectedMaster={selectedMaster}
                            />
                        ),
                        title: 'Выберите мастера',
                    })
                }
            />

            <SlotsList
                schedules={scheduleQuery.data?.schedules}
                selectedMaster={selectedMaster}
                selectedSlot={selectedSlot}
                setSelectedSlot={setSelectedSlot}
                isLoading={barbersQuery.isLoading || scheduleQuery.isLoading}
                isError={barbersQuery.isError || scheduleQuery.isError}
            />

            <Button
                variant="default"
                disabled={!selectedSlot || !selectedMaster}
                onClick={() => {
                    if (selectedMaster !== null && selectedSlot !== null && serviceIdState !== null) {
                        openDialog({
                            content: (
                                <BookingForm
                                    barber_id={selectedMaster}
                                    time_id={selectedSlot}
                                    service_id={serviceIdState}
                                />
                            ),
                            title: 'Новая запись',
                        });
                    }
                }}
            >
                Записаться
            </Button>
        </div>
    );
}