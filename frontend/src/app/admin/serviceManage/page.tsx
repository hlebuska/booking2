'use client';
import useServices from '@/hooks/use-services';
import ServiceAdminCard from './components/service-admin-card';
import ServiceAdminList from './components/service-admin-list';

// Display existing services (edit, remove)
// -- Good looking tables
// -- add search

// Create new services
// -- Form with validation (modal?)

// (later) Select where these services are awailable (probably should be done in branches manage)

export default function ServiceManage() {
    const { unfilteredServices } = useServices();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <ServiceAdminList services={unfilteredServices} />
        </div>
    );
}
