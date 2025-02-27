import ServiceInfoCard from './components/serviceInfoCard';

// Display existing services (edit, remove)
// -- Good looking tables
// -- add search

// Create new services
// -- Form with validation (modal?)

// (later) Select where these services are awailable (probably should be done in branches manage)

const invoices = [
    {
        name: 'Борода 1 головы первой категории',
        category: 'Стрижка',
        description:
            'Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки, -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами',
        duration: 1,
        price: 10000,
    },
];

export default function ServiceManage() {
    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen">
            <ServiceInfoCard />
            <ServiceInfoCard />
            <ServiceInfoCard />
        </div>
    );
}
