'use client';
import { Button } from '@/components/ui/button';
import { H4 } from '@/components/ui/typography';
import { EllipsisVertical, Pencil, Settings2, Trash2 } from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDialogStore } from '@/hooks/use-dialog-store';
import MastersServiceList from './master-service-list/masters-service-list';

interface IProps {
    masterId: number;
    name: string;
    description: string;
}

export default function MasterAdminCard({ masterId, name, description }: IProps) {
    const { openDialog } = useDialogStore();

    return (
        <div className="flex flex-col items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all p-3 bg-muted outline-none outline-offset-0  border overflow-hidden">
            <div className="flex justify-between items-center w-full">
                <H4 className="mb-3 ml-1">{name}</H4>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Мастер</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();

                                    // openDialog({
                                    //     content: (
                                    //         <PatchServiceForm
                                    //             id={serviceId}
                                    //             name={name}
                                    //             description={description}
                                    //             duration={duration}
                                    //             price={price}
                                    //         />
                                    //     ),
                                    //     title: 'Редактирование услуги',
                                    //     description: 'Введите данные об услуге.',
                                    // });
                                }}
                            >
                                <Pencil />
                                <span>Редактировать</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onSelect={(e) => {
                                    e.preventDefault();

                                    // confirm({
                                    //     title: 'Вы уверены что хотите удалить эту услугу?',
                                    //     description: `Это действие безвозвратно удалит услугу - (${name}).`,
                                    //     onConfirm: async () => {
                                    //         await deleteService(masterId);
                                    //         queryClient.invalidateQueries({ queryKey: ['services'] });
                                    //     },
                                    // });
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
                <div className="flex gap-3 items-center">
                    <div className="w-3/12 truncate text-center border-r flex-grow-0 flex-shrink-0">
                        <b>Описание:</b>
                    </div>

                    <div className="w-8/12 break-words">{description}</div>
                </div>
            </div>
            <div className="w-full border-b  text-xs xs:text-sm py-1 ">
                <div className="flex gap-3 items-center">
                    <div className="w-3/12 truncate text-center border-r flex-grow-0 flex-shrink-0">
                        <b>Услуги:</b>
                    </div>

                    <div className="w-8/12 truncate ">
                        Услуга 1, Услуга 2, Услуга 1, Услуга 2, Услуга 1, Услуга 2, Услуга 1, Услуга 2, Услуга 4
                    </div>
                    <Button
                        variant="ghost"
                        className="p-2 h-fit"
                        onClick={() =>
                            openDialog({
                                content: <MastersServiceList />,
                                title: 'Редактирование доступных услуг',
                                description: 'Выберите услуги которые может выполнять данный мастер.',
                            })
                        }
                    >
                        <Settings2 />
                    </Button>
                </div>
            </div>
        </div>
    );
}
