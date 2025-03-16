'use client';
import AdminCard from '@/components/ui/admin-card';
import MastersServiceList from '@/components/features/masters/master-service-list/masters-service-list';
import CreateServiceForm from '@/components/features/services/create-service-form';
import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import { SearchIcon, Settings2 } from 'lucide-react';

export default function ServiceManage() {
    const { unfilteredServices } = useServices();
    const { searchItem, handleInputChange, filteredServices } = useSearch(unfilteredServices ?? []);
    const { openDialog } = useDialogStore();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <Button
                onClick={() => {
                    openDialog({
                        content: <CreateServiceForm />,
                        title: 'Создание услуги',
                        description: 'Введите данные об услуге.',
                    });
                }}
            >
                Создать мастера
            </Button>
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />

            <AdminCard>
                <AdminCard.Header>Глеб</AdminCard.Header>
                <AdminCard.Row>
                    <AdminCard.RowTitle>Описание: </AdminCard.RowTitle>
                    <AdminCard.RowDescription>Первая категория</AdminCard.RowDescription>
                </AdminCard.Row>
                <AdminCard.Row>
                    <AdminCard.RowTitle>Услуги: </AdminCard.RowTitle>
                    <AdminCard.RowDescription truncate>
                        Стрижка головы 1 категории, Стрижка головы и бороды, Стижка бесплатная (налысо)
                    </AdminCard.RowDescription>
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
                </AdminCard.Row>
            </AdminCard>
        </div>
    );
}
