import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useDialogStore } from '@/hooks/use-dialog-store';

import { ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface IProps {
    name: string;
    index: number;
}

export default function MastersServiceOption({ name, index }: IProps) {
    const router = useRouter();
    const { setOpen } = useDialogStore();

    return (
        <div className={`w-full text-xs xs:text-sm py-1 border-b ${index == 0 && 'border-t'}`}>
            <div className="flex gap-3 items-center">
                <div className=" border-r px-2 flex justify-center items-center">
                    <Checkbox />
                </div>

                <div className="w-full">{name}</div>
                <Button
                    variant="ghost"
                    className="p-2 h-fit"
                    onClick={() => {
                        setOpen(false);
                        router.push('/admin/serviceManage');
                    }}
                >
                    <ExternalLink size={16} color="#71717a" />
                </Button>
            </div>
        </div>
    );
}
