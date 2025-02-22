import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../../../../../components/ui/button';
import BookingForm from './booking-form';

interface IProps {
    selectedService: number | null;
    selectedMaster: number | null;
    selectedSlot: number | null;
}

//Responsible for opening a dialog with form to submit a booking
export default function BookingFormDialog({ selectedSlot, selectedMaster, selectedService }: IProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" disabled={!selectedSlot || !selectedMaster}>
                    Записаться
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Контактные данные</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {selectedMaster !== null && selectedSlot !== null && selectedService !== null && (
                    <BookingForm barber_id={selectedMaster} time_id={selectedSlot} service_id={selectedService} />
                )}
            </DialogContent>
        </Dialog>
    );
}
