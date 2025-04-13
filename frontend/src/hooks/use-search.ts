'use client';

import { useEffect, useState } from 'react';

export function useSearch<T>(
    unfilteredData: T[] = [],
    filterFn: (item: T, searchItem: string) => boolean,
    initialSearch: string = ''
) {
    const [searchItem, setSearchItem] = useState(initialSearch);
    const [filteredData, setFilteredData] = useState<T[]>([]);
    const [notFoundText, setNotFoundText] = useState('');

    const applyFilter = (term: string) => {
        const results = unfilteredData.filter((item) => filterFn(item, term));

        if (results.length > 0) {
            setFilteredData(results);
            setNotFoundText('');
        } else {
            setFilteredData([]);
            setNotFoundText(`По запросу "${term}" ничего не найдено.`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchItem(term);
        applyFilter(term.trim());
    };

    useEffect(() => {
        setSearchItem(initialSearch);
        applyFilter(initialSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialSearch, unfilteredData]);

    return {
        searchItem,
        handleInputChange,
        filteredData,
        notFoundText,
    };
}
