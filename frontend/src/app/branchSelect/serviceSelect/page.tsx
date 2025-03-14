'use client';
import IconInput from '@/components/ui/icon-input';
import ServiceSelectList from '@/components/features/services/service-select-list';
import { H2 } from '@/components/ui/typography';
import { useSearch } from '@/hooks/use-search';
import { SearchIcon } from 'lucide-react';
import useServices from '@/hooks/use-services';

export default function ServiceSelectPage() {
    const { unfilteredServices } = useServices();
    const { searchItem, handleInputChange, filteredServices } = useSearch(unfilteredServices ?? []);

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <H2>Выбрать услугу</H2>
            <div className="flex flex-col gap-3">
                <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            </div>
            <ServiceSelectList services={filteredServices} />
        </div>
    );
}
