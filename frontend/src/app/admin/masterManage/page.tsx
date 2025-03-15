'use client';
import CreateServiceForm from '@/components/features/services/create-service-form';
import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import { SearchIcon } from 'lucide-react';
import ServiceAdminList from '../../../components/features/services/service-admin-list';
import MasterAdminCard from '@/components/features/masters/master-admin-card';

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
            <MasterAdminCard name="Барбер 1" masterId={1} description="1 категория" />
        </div>
    );
}
