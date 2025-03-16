'use client';
import Link from 'next/link';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Separator } from '@/components/ui/separator';
import { Building2, Home, Scissors, Settings, UserRound } from 'lucide-react';

//REDO THIS SHIT (writing own navbar easier that trying to fix this weird bs)
export default function AdminNavbar() {
    return (
        <div className="mx-auto pt-9  w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full  ">
            <NavigationMenu className="border rounded-md  w-full max-w-full ">
                <NavigationMenuList className="w-full flex-col xs:flex-row ">
                    <NavigationMenuItem className="border-b xs:border-none w-full">
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Home size={16} strokeWidth={1.5} className="mr-1" /> Главная
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" className="h-6 w-[1px] hidden xs:block" />
                    <NavigationMenuItem className="border-b xs:border-none w-full">
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Building2 size={16} strokeWidth={1.25} className="mr-1" /> Филиалы
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" className="h-6 w-[1px] hidden xs:block" />

                    <NavigationMenuItem className="border-b xs:border-none w-full">
                        <Link href="/admin/serviceManage" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Scissors size={16} strokeWidth={1.5} className="mr-1" />
                                Услуги
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" className="h-6 w-[1px] hidden xs:block" />

                    <NavigationMenuItem className="border-b xs:border-none w-full ">
                        <Link href="/admin/masterManage" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <UserRound size={16} strokeWidth={1.5} className="mr-1" /> Мастера
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <Separator orientation="vertical" className="h-6 w-[1px] hidden xs:block" />

                    <NavigationMenuItem className="w-full ">
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Settings size={16} strokeWidth={1.5} className="mr-1" /> Настройки
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
