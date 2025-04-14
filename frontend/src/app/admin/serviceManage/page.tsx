'use client';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import SearchBar from '@/components/common/search-bar';
import ServiceAdminList from '@/components/features/services/service-admin-list';
import CreateServiceForm from '@/components/forms/create-service-form';
import { Button } from '@/components/ui/button';
import useAuthGuard from '@/hooks/use-auth-guard';
import { useDialogStore } from '@/hooks/use-dialog-store';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import useStore from '@/hooks/use-store';
import { filterServices } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function ServiceManage() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') ?? '';

    const { unfilteredServices, isServicesLoading, isServicesError } = useServices();
    const { searchItem, handleInputChange, filteredData, notFoundText } = useSearch(
        unfilteredServices ?? [],
        filterServices,
        initialSearch
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
                        content: <CreateServiceForm />,
                        title: 'Создание услуги',
                        description: 'Введите данные об услуге.',
                    });
                }}
            >
                Создать услугу
            </Button>

            <SearchBar value={searchItem} defaultValue={initialSearch} onChange={handleInputChange} />
            <ConditionalSkeletonLoader
                isLoading={isServicesLoading}
                isError={isServicesError}
                isEmpty={unfilteredServices.length == 0 && !!unfilteredServices}
                emptyMessage="В базе данных нет услугO."
                className="h-3"
            >
                <ServiceAdminList services={filteredData} />
                <p className="text-zinc-500">{notFoundText}</p>
            </ConditionalSkeletonLoader>
        </div>
    );
}
