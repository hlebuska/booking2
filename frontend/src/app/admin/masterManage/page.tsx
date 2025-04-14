'use client';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import MastersAdminList from '@/components/features/masters/master-admin-list';
import CreateMasterForm from '@/components/forms/create-master-form';
import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import useAuthGuard from '@/hooks/use-auth-guard';
import { useDialogStore } from '@/hooks/use-dialog-store';
import useMasters from '@/hooks/use-masters';
import { useSearch } from '@/hooks/use-search';
import useStore from '@/hooks/use-store';
import { filterMasters } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

export default function ServiceManage() {
    const { unfilteredMasters, isMastersLoading, isMastersError } = useMasters();
    const { searchItem, handleInputChange, filteredData, notFoundText } = useSearch(
        unfilteredMasters ?? [],
        filterMasters
    );
    const { openDialog } = useDialogStore();

    useAuthGuard();
    const { accessToken } = useStore();
    if (!accessToken) return null;

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <Button
                onClick={() => {
                    openDialog({
                        content: <CreateMasterForm />,
                        title: 'Создание мастера',
                        description: 'Введите данные о мастере.',
                    });
                }}
            >
                Создать мастера
            </Button>
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            <ConditionalSkeletonLoader
                isLoading={isMastersLoading}
                isError={isMastersError}
                isEmpty={unfilteredMasters.length == 0 && !!unfilteredMasters}
                emptyMessage="В базе данных нет услуг."
            >
                <MastersAdminList masters={filteredData} />
                <p className="text-zinc-500">{notFoundText}</p>
            </ConditionalSkeletonLoader>
        </div>
    );
}
