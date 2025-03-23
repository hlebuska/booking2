'use client';

import { IMaster } from '@/lib/type/types';
import AdminCard from '../../ui/admin-card';
import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { ArrowDownUp, Settings2 } from 'lucide-react';
import MastersServiceList from './master-service-list/masters-service-list';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdminList from '@/components/common/admin-list';

interface IProps {
    masters?: IMaster[];
}

export default function MastersAdminList({ masters }: IProps) {
    const { openDialog } = useDialogStore();

    return (
        <div className="flex flex-col gap-4">
            {/* Sorting dropdown */}
            <div className="flex items-center gap-2 mt-2 relative">
                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center ml-[9px] pointer-events-none w-4 h-4 text-zinc-500">
                    <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                </div>
                <Select>
                    <SelectTrigger className="w-[300px] pl-8 text-zinc-500">
                        <SelectValue placeholder="По названию" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className="pl-8" value="2">
                                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                    <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                                </div>
                                По названию
                            </SelectItem>
                            <SelectItem className="pl-8" value="1">
                                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                    <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                                </div>
                                По времени создания
                            </SelectItem>
                            <SelectItem className="pl-8" value="3">
                                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                    <ArrowDownUp color="#85858d" strokeWidth={1.75} />
                                </div>
                                По длительности
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Generic list rendering masters */}
            <AdminList
                items={masters}
                renderItem={(master, index) => (
                    <AdminCard key={index}>
                        <AdminCard.Header>{master.name}</AdminCard.Header>
                        <AdminCard.Row>
                            <AdminCard.RowTitle>Описание: </AdminCard.RowTitle>
                            <AdminCard.RowDescription>Первая категория</AdminCard.RowDescription>
                        </AdminCard.Row>
                        <AdminCard.Row>
                            <AdminCard.RowTitle>Услуги: </AdminCard.RowTitle>
                            <AdminCard.RowDescription truncate>
                                [ПЕРЕДЕЛАТЬ] - список услуг мастера
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
                    </AdminCard>
                )}
            />
        </div>
    );
}
