'use client';
import CreateServiceForm from '@/components/forms/create-service-form';
import { Button } from '@/components/ui/button';
import IconInput from '@/components/ui/icon-input';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import { SearchIcon } from 'lucide-react';
import ServiceAdminList from '@/components/features/services/service-admin-list';
import { filterServices } from '@/lib/utils';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';

export default function ServiceManage() {
    const { unfilteredServices, isServicesLoading, isServicesError } = useServices();
    const { searchItem, handleInputChange, filteredData, notFoundText } = useSearch(
        unfilteredServices ?? [],
        filterServices
    );
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
                Создать услугу
            </Button>
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            <ConditionalSkeletonLoader
                isLoading={isServicesLoading}
                isError={isServicesError}
                isEmpty={unfilteredServices.length == 0 && !!unfilteredServices}
                emptyMessage="В базе данных нет услуг."
                className="h-3"
            >
                <ServiceAdminList services={filteredData} />
                <p className="text-zinc-500">{notFoundText}</p>
            </ConditionalSkeletonLoader>
        </div>
    );
}
