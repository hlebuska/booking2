import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useDialogStore } from '@/hooks/use-dialog-store';

export default function GlobalDialog() {
    const { content, isOpen, title, description, setOpen } = useDialogStore();

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[700px] h-screen max-h-[90%] flex flex-col ">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <>{content}</>
            </DialogContent>
        </Dialog>
    );
}
