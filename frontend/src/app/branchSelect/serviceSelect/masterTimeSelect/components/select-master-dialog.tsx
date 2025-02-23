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
import { Button } from '../../../../../components/ui/button';
import SelectMasterList from './select-master-list';
import MasterCard from './master-card';
import MasterDialogTrigger from './master-dialog-trigger';

interface IProps {
    barbers: IMaster[];
    selectedMaster: number | null;
    selectedMasterName: string;
    setSelectedMaster: (id: number) => void;
}

//Responsible for rendering and selecting masters
export default function SelectMasterDialog({ barbers, selectedMaster, selectedMasterName, setSelectedMaster }: IProps) {
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
                    <MasterDialogTrigger name={selectedMasterName} id={selectedMaster} onClick={() => setOpen(true)} />
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
