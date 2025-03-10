'use client';
import IconInput from '@/components/ui/icon-input';
import { useSearch } from '@/hooks/use-search';
import useServices from '@/hooks/use-services';
import { Plus, SearchIcon } from 'lucide-react';
import ServiceAdminList from './components/service-admin-list';
import { Button } from '@/components/ui/button';
import CreateServiceFormDialog from './components/create-service-form-dialog';

// Display existing services (edit, remove)
// -- Good looking tables
// -- add search

// Create new services
// -- Form with validation (modal?)

// (later) Select where these services are awailable (probably should be done in branches manage)

export default function ServiceManage() {
    const { unfilteredServices } = useServices();
    const { searchItem, handleInputChange, filteredServices } = useSearch(unfilteredServices ?? []);

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <CreateServiceFormDialog />
            <div className="flex flex-col gap-3">
                <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            </div>
            <ServiceAdminList services={filteredServices} />
        </div>
    );
}
