import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { IMaster } from '@/lib/type/types';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import SelectMasterList from '../ui/select-master-list';

interface IProps {
    barbers: IMaster[];
    selectedMaster: number | null;
    setSelectedMaster: (id: number) => void;
}

//Responsible for rendering and selecting masters
export default function SelectMasterDialog({ barbers, selectedMaster, setSelectedMaster }: IProps) {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        if (selectedMaster) {
            setOpen(false);
        }
    }, [selectedMaster]);

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Выберите мастера</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Выберите мастера</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>

                    <SelectMasterList
                        masters={barbers}
                        setMasterId={setSelectedMaster}
                        selectedMaster={selectedMaster}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
