'use client';

import { IService } from '@/lib/type/types';
import { useState } from 'react';

export function useSearch(unfilteredServices: IService[]) {
    const [searchItem, setSearchItem] = useState('');
    const [filteredServices, setFilteredServices] = useState(unfilteredServices);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = unfilteredServices.filter((service) =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(filteredItems);
        if (filteredItems.length > 0) {
            setFilteredServices(filteredItems);
        } else {
            setFilteredServices(unfilteredServices);
        }
    };

    return { searchItem, handleInputChange, filteredServices };
}
