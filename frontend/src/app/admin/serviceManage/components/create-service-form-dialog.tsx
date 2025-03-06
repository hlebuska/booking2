import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CreateServiceForm from './create-service-form';
// import BookingForm from './booking-form';

//Responsible for opening a dialog with form to create a service
export default function CreateServiceFormDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <Plus /> Добавить услугу
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Новая услуга</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <CreateServiceForm />
            </DialogContent>
        </Dialog>
    );
}
