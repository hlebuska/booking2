'use client';

import { useEffect, useState } from 'react';

export function useSearch<T>(unfilteredData: T[] = [], filterFn: (item: T, searchItem: string) => boolean) {
    const [searchItem, setSearchItem] = useState('');
    const [filteredData, setFilteredData] = useState(unfilteredData);
    const [notFoundText, setNotFoundText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //Filtering
        const searchTerm = e.target.value;
        setSearchItem(searchTerm);
        const filteredItems = unfilteredData.filter((item) => filterFn(item, searchTerm));

        if (filteredItems.length > 0) {
            setFilteredData(filteredItems);
            setNotFoundText('');
        } else {
            setFilteredData([]);
            console.log('not found');
            setNotFoundText(`По запросу "${searchItem}" ничего не найдено.`);
        }
    };

    //Update unfilteredServices on fetch
    useEffect(() => {
        setFilteredData(unfilteredData);
    }, [unfilteredData]);

    return { searchItem, handleInputChange, filteredData, notFoundText };
}
