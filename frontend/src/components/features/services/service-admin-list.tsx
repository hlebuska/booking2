import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IService } from '@/lib/type/types';
import { deleteService, formatDuration, queryClient } from '@/lib/utils';
import AdminCard from '../../ui/admin-card';

import AdminList from '@/components/common/admin-list';
import { Button } from '@/components/ui/button';
import useConfirm from '@/hooks/use-confirm';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import PatchServiceForm from '../../forms/patch-service-form';

interface IProps {
    services?: IService[];
}

export default function ServiceAdminList({ services }: IProps) {
    const { confirm } = useConfirm();
    const { openDialog } = useDialogStore();

    return (
        <AdminList
            items={services}
            renderItem={(service, index) => (
                <AdminCard key={index}>
                    <AdminCard.Header>
                        <AdminCard.Title>{service.name}</AdminCard.Title>
                        <div className="ml-auto absolute right-0 top-1/2 -translate-y-1/2">
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
                                                            id={service.id}
                                                            name={service.name}
                                                            description={service.description}
                                                            duration={service.duration}
                                                            price={service.price}
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
                                                    description: `Это действие безвозвратно удалит услугу - (${service.name}).`,
                                                    onConfirm: async () => {
                                                        await deleteService(service.id);
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
                        <AdminCard.RowDescription>{service.description}</AdminCard.RowDescription>
                    </AdminCard.Row>
                    <AdminCard.Row>
                        <AdminCard.RowTitle>Длительность: </AdminCard.RowTitle>
                        <AdminCard.RowDescription>{formatDuration(service.duration)}</AdminCard.RowDescription>
                    </AdminCard.Row>
                    <AdminCard.Row>
                        <AdminCard.RowTitle>Стоимость: </AdminCard.RowTitle>
                        <AdminCard.RowDescription>{service.price} ₸</AdminCard.RowDescription>
                    </AdminCard.Row>
                </AdminCard>
            )}
        />
    );
}
