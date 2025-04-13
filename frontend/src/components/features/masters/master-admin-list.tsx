'use client';

import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { IMaster } from '@/lib/types';
import { CalendarCheck, EllipsisVertical, Pencil, Scissors, Settings2, Trash2 } from 'lucide-react';
import AdminCard from '@/components/ui/admin-card';
import MastersServiceList from './master-service-list/masters-service-list';

import AdminList from '@/components/common/admin-list';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useConfirm from '@/hooks/use-confirm';
import { deleteMaster, queryClient } from '@/lib/utils';
import { MastersSchedule } from './master-schedule.tsx/master-schedule';

interface IProps {
    masters?: IMaster[];
}

export default function MastersAdminList({ masters }: IProps) {
    const { openDialog } = useDialogStore();
    const { confirm } = useConfirm();

    return (
        <div className="flex flex-col gap-4">
            <AdminList
                items={masters}
                renderItem={(master, index) => (
                    <AdminCard key={index}>
                        <AdminCard.Header>
                            <AdminCard.Title>{master.name}</AdminCard.Title>
                            <div className="ml-auto absolute right-0 top-1/2 -translate-y-1/2">
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
                                                    openDialog({
                                                        content: <>yo</>,
                                                        title: 'Редактирование мастера',
                                                        description: 'Введите данные о мастере.',
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
                                                        title: 'Вы уверены что хотите удалить эту мастера?',
                                                        description: `Это действие безвозвратно удалит мастера - (${master.name}).`,
                                                        onConfirm: async () => {
                                                            await deleteMaster(master.id);
                                                            queryClient.invalidateQueries({ queryKey: ['services'] });
                                                        },
                                                    });
                                                }}
                                            >
                                                <Trash2 />
                                                <span>Удалить</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </AdminCard.Header>
                        <AdminCard.Row>
                            <AdminCard.RowTitle>Описание: </AdminCard.RowTitle>
                            <AdminCard.RowDescription>{master.description}</AdminCard.RowDescription>
                        </AdminCard.Row>
                        <AdminCard.Row>
                            <AdminCard.RowTitle>Услуги: </AdminCard.RowTitle>
                            <AdminCard.RowDescription truncate>
                                <Scissors strokeWidth={1.5} size={20} className="hidden xs:inline" /> Список услуг
                                доступных данному мастеру.
                            </AdminCard.RowDescription>
                            <Button
                                variant="ghost"
                                className="p-2 h-fit"
                                onClick={() =>
                                    openDialog({
                                        content: <MastersServiceList masterId={master.id} />,
                                        title: 'Редактирование доступных услуг',
                                        description: 'Выберите услуги которые может выполнять данный мастер.',
                                    })
                                }
                            >
                                <Settings2 />
                            </Button>
                        </AdminCard.Row>
                        <AdminCard.Row>
                            <AdminCard.RowTitle>Услуги: </AdminCard.RowTitle>
                            <AdminCard.RowDescription truncate>
                                <CalendarCheck size={20} strokeWidth={1.5} className="hidden xs:inline" /> Расписание
                                мастера.
                            </AdminCard.RowDescription>
                            <Button
                                variant="ghost"
                                className="p-2 h-fit"
                                onClick={() =>
                                    openDialog({
                                        content: <MastersSchedule />,
                                        title: 'Редактирование расписания мастера',
                                        description: 'Выберите часы в которые мастер доступен для записи.',
                                    })
                                }
                            >
                                <Settings2 />
                            </Button>
                        </AdminCard.Row>
                    </AdminCard>
                )}
            />
        </div>
    );
}
