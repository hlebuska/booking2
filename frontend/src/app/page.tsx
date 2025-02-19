'use client';
import IconInput from '@/components/ui/icon-input';
import ServiceSelectPage from '@/components/ui/service-select';
import { H2 } from '@/components/ui/typography';
import { useSearch } from '@/hooks/use-search';
import { SearchIcon } from 'lucide-react';

const mockServices = [
    {
        id: 1,
        name: 'Борода 1 головы первой категории',
        description:
            'Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
    {
        id: 2,
        name: 'Стрижка головы первой категории',
        description:
            'Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
    {
        id: 3,
        name: 'Стрижка головы первой категории',
        description:
            'Мужская стрижка выполняется  машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
];

export default function Home() {
    const { searchItem, handleInputChange, filteredServices } = useSearch(mockServices);
    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-scr">
            <H2>Выбрать услгу</H2>
            <div className="flex flex-col gap-3">
                <IconInput icon={<SearchIcon strokeWidth={2} />} value={searchItem} onChange={handleInputChange} />
            </div>
            <ServiceSelectPage services={filteredServices} />
        </div>
    );
}
