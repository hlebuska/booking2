import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { cardVariants } from '@/lib/animations';

import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface IProps {
    name: string;
    index: number;
    checked?: boolean;
    onChange: () => void;
}

export default function MastersServiceOption({ name, index, checked, onChange }: IProps) {
    const { setOpen } = useDialogStore();

    return (
        <motion.div
            variants={cardVariants}
            className={`w-full text-xs xs:text-sm py-1 border-b ${index == 0 && 'border-t'}`}
        >
            <div className="flex gap-3 items-center">
                <div className=" border-r px-2 flex justify-center items-center">
                    <Checkbox checked={checked} onCheckedChange={() => onChange()} />
                </div>

                <div className="w-full">{name}</div>
                <Button
                    variant="ghost"
                    className="p-2 h-fit"
                    onClick={() => {
                        setOpen(false);
                        window.open(`/admin/serviceManage?search=${encodeURIComponent(name)}`, '_blank');
                    }}
                >
                    <ExternalLink size={16} color="#71717a" />
                </Button>
            </div>
        </motion.div>
    );
}
