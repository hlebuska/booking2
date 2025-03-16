import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import { IService } from '@/lib/type/types';
import { deleteService, formatDuration, queryClient } from '@/lib/utils';
import AdminCard from '../../ui/admin-card';

import { Button } from '@/components/ui/button';
import useConfirm from '@/hooks/use-confirm';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';
import PatchServiceForm from './patch-service-form';

interface IProps {
    services?: IService[];
}

export default function ServiceAdminList({ services }: IProps) {
    const { confirm } = useConfirm();
    const { openDialog } = useDialogStore();

    return (
        <div className="flex flex-col gap-5">
            {services && services.length > 0 ? (
                services.map((service, index) => (
                    <AdminCard key={index}>
                        <AdminCard.Header>
                            <AdminCard.Title>{service.name}</AdminCard.Title>
                            <div className="ml-auto">
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
                                                        description: `Это действие безвозвратно удалит услугу - (${name}).`,
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
                                        <DropdownMenuSeparator />
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
                ))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
