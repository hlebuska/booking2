import SkeletonLoader from '@/components/ui/skeleton-loader';
import { IMaster } from '@/lib/type/types';
import AdminCard from '../../ui/admin-card';
import { Button } from '@/components/ui/button';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { Settings2 } from 'lucide-react';
import MastersServiceList from './master-service-list/masters-service-list';

interface IProps {
    masters?: IMaster[];
}

export default function MastersAdminList({ masters }: IProps) {
    const { openDialog } = useDialogStore();

    return (
        <div className="flex flex-col gap-5">
            {masters && masters.length > 0 ? (
                masters.map((master, index) => (
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
                ))
            ) : (
                <SkeletonLoader className={'w-1/2 h-6'} />
            )}
        </div>
    );
}
