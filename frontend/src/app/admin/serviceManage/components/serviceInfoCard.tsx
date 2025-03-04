'use client';
import { Button } from '@/components/ui/button';
import { H4 } from '@/components/ui/typography';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// todo: dropdown shadcn
export default function ServiceInfoCard() {
    return (
        <div className="flex flex-col gap-2 items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all p-3 bg-muted outline-none outline-offset-0  border overflow-hidden">
            <div className="flex justify-between items-center w-full">
                <H4>Борода 1 головы первой категории</H4>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Услуга</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Pencil />
                                <span>Редактировать</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trash2 />
                                <span>Удалить</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Separator />
            <div className="w-full">
                <div className="flex gap-3">
                    <div className="w-2/12">
                        <b>Описание:</b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-10/12">
                        Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы
                        до и после стрижки, -стрижка,-укладка профессиональными средствами
                    </div>
                </div>
            </div>
            <Separator />
            <div className="w-full">
                <div className="flex gap-3">
                    <div className="w-2/12">
                        <b>Длительность: </b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-10/12">1ч</div>
                </div>
            </div>
            <Separator />
            <div className="w-full">
                <div className="flex gap-3">
                    <div className="w-2/12">
                        <b>Стоимость: </b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-10/12">10000</div>
                </div>
            </div>

            <div className="flex flex-col xs:flex-row-reverse gap-2 w-full"></div>
        </div>
    );
}
