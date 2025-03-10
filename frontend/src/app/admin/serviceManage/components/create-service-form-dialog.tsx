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
import { useState } from 'react';
// import BookingForm from './booking-form';

//Responsible for opening a dialog with form to create a service
export default function CreateServiceFormDialog() {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={() => setOpen(true)}>
                    <Plus /> Добавить услугу
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Новая услуга</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <CreateServiceForm setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    );
}
