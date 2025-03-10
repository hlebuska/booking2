import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

interface ConfirmDialogState {
    open: boolean;
    title: string;
    description: string;
    onConfirm?: () => void;
}

export function ConfirmDialog() {
    const [dialogState, setDialogState] = useState<ConfirmDialogState>({
        open: false,
        title: 'Are you sure?',
        description: 'This action cannot be undone.',
    });

    const handleConfirm = () => {
        setDialogState({ ...dialogState, open: false });
        if (dialogState.onConfirm) dialogState.onConfirm();
    };

    const handleCancel = () => {
        setDialogState({ ...dialogState, open: false });
    };

    useEffect(() => {
        const handleOpen = (event: Event) => {
            const { title, description, onConfirm } = (event as CustomEvent).detail;
            setDialogState({ open: true, title, description, onConfirm });
        };

        window.addEventListener('open-confirm-dialog', handleOpen);

        return () => {
            window.removeEventListener('open-confirm-dialog', handleOpen);
        };
    }, []);

    return (
        <AlertDialog open={dialogState.open} onOpenChange={(value) => setDialogState({ ...dialogState, open: value })}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{dialogState.title}</AlertDialogTitle>
                    <AlertDialogDescription>{dialogState.description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={handleCancel}>Нет</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm}>Да</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
