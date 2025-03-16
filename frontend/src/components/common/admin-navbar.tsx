'use client';

import Link from 'next/link';
import { Home, Building2, Scissors, UserRound, Settings } from 'lucide-react';

const NAV_ITEMS = [
    { href: '/dashboard', label: 'Главная', icon: Home },
    { href: '/branches', label: 'Филиалы', icon: Building2 },
    { href: '/admin/serviceManage', label: 'Услуги', icon: Scissors },
    { href: '/admin/masterManage', label: 'Мастера', icon: UserRound },
    { href: '/settings', label: 'Настройки', icon: Settings },
];

export default function AdminNavbar() {
    return (
        <nav className="mx-auto pt-6 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full">
            <ul className="flex flex-col xs:flex-row border rounded-md w-full justify-between">
                {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
                    <li key={href} className="w-full border-b xs:border-r xs:border-b-0 last:border-r-0">
                        <Link
                            href={href}
                            className="flex items-center justify-center py-2 text-sm font-medium hover:bg-gray-100"
                        >
                            <Icon size={16} strokeWidth={1.5} className="mr-2" />
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
