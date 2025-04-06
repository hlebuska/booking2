'use client';
import IconInput from '@/components/ui/icon-input';
import ServiceSelectList from '@/components/features/services/service-select-list';
import { H2 } from '@/components/ui/typography';
import { useSearch } from '@/hooks/use-search';
import { SearchIcon } from 'lucide-react';
import useServices from '@/hooks/use-services';
import { filterServices } from '@/lib/utils';
import ConditionalSkeletonLoader from '@/components/common/conditional-skeleton-loader';
import SearchBar from '@/components/common/search-bar';

export default function ServiceSelectPage() {
    const { unfilteredServices, isServicesLoading, isServicesError } = useServices();
    const { searchItem, handleInputChange, filteredData, notFoundText } = useSearch(
        unfilteredServices ?? [],
        filterServices
    );

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Выбрать услугу</H2>
            <SearchBar value={searchItem} onChange={handleInputChange} />

            <ConditionalSkeletonLoader
                isLoading={isServicesLoading}
                isError={isServicesError}
                isEmpty={unfilteredServices.length == 0 && !!unfilteredServices}
                emptyMessage="В базе данных нет услуг."
                className="h-3"
            >
                <ServiceSelectList services={filteredData} />
                <p className="text-zinc-500">{notFoundText}</p>
            </ConditionalSkeletonLoader>
        </div>
    );
}
