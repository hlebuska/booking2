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
import useConfirm from '@/hooks/use-confirm';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { deleteService, queryClient } from '@/lib/utils';
import PatchServiceForm from './patch-service-form';

interface IProps {
    serviceId: number;
    name: string;
    description: string;
    duration: number;
    price: number;
}

export default function ServiceAdminCard({ serviceId, name, description, duration, price }: IProps) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const { confirm } = useConfirm();
    const { openDialog } = useDialogStore();

    return (
        <div className="flex flex-col items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all p-3 bg-muted outline-none outline-offset-0  border overflow-hidden">
            <div className="flex justify-between items-center w-full">
                <H4 className="mb-3">{name}</H4>
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
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();

                                    openDialog({
                                        content: (
                                            <PatchServiceForm
                                                id={serviceId}
                                                name={name}
                                                description={description}
                                                duration={duration}
                                                price={price}
                                            />
                                        ),
                                        title: 'Редактирование услуги',
                                        description: 'Введите данные об услуге.',
                                    });
                                }}
                            >
                                <Pencil />
                                <span>Редактировать</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();

                                    confirm({
                                        title: 'Вы уверены что хотите удалить эту услугу?',
                                        description: `Это действие безвозвратно удалит услугу - (${name}).`,
                                        onConfirm: async () => {
                                            await deleteService(serviceId);
                                            queryClient.invalidateQueries({ queryKey: ['services'] });
                                        },
                                    });
                                }}
                            >
                                <Trash2 />
                                <span>Удалить</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="w-full border-b border-t py-1 text-xs xs:text-sm">
                <div className="flex gap-3">
                    <div className="w-3/12 truncate">
                        <b>Описание:</b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-8/12 break-words">{description}</div>
                </div>
            </div>

            <div className="w-full py-1 text-xs xs:text-sm">
                <div className="flex gap-3">
                    <div className="w-3/12 truncate">
                        <b>Длительность: </b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-8/12">
                        {hours ? `${hours} ч.` : ''} {minutes} мин.
                    </div>
                </div>
            </div>

            <div className="w-full border-b border-t  py-1 text-xs xs:text-sm">
                <div className="flex gap-3">
                    <div className="w-3/12 truncate">
                        <b>Стоимость: </b>
                    </div>
                    <Separator orientation="vertical" className="h-auto" />
                    <div className="w-8/12">{price} ₸</div>
                </div>
            </div>

            <div className="flex flex-col xs:flex-row-reverse gap-2 w-full"></div>
        </div>
    );
}
