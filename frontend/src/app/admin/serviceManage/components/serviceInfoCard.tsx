import { Button } from '@/components/ui/button';
import { H4, H5 } from '@/components/ui/typography';
import { Pencil, Trash2 } from 'lucide-react';

// todo: dropdown shadcn
export default function ServiceInfoCard() {
    return (
        <div className="flex flex-col gap-3 items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all p-3 bg-muted outline-none outline-offset-0  border overflow-hidden">
            <H4>Борода 1 головы первой категории</H4>

            <div className="flex flex-col gap-[6px]">
                <p>
                    <b>Описание: </b>Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки,
                    -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами
                </p>
                <p>
                    <b>Длительность: </b>1ч
                </p>
                <p>
                    <b>Стоимость: </b> 100000 т
                </p>
            </div>

            <div className="flex flex-col xs:flex-row-reverse gap-2 w-full">
                <Button variant={'destructive'} className="text-xs">
                    Удалить <Trash2 />
                </Button>
                <Button className="text-xs">
                    Редактировать
                    <Pencil />
                </Button>
            </div>
        </div>
    );
}
