'use client';
import MastersAdminList from '@/components/features/masters/master-admin-list';
import CreateServiceForm from '@/components/forms/create-service-form';
import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import { useDialogStore } from '@/hooks/use-dialog-store';
import useMasters from '@/hooks/use-masters';
import { useSearch } from '@/hooks/use-search';
import { filterMasters } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

export default function ServiceManage() {
    const { unfilteredMasters } = useMasters();
    const { searchItem, handleInputChange, filteredData } = useSearch(unfilteredMasters ?? [], filterMasters);
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
            <MastersAdminList masters={filteredData} />
        </div>
    );
}
