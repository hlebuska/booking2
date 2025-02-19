import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { breadcrumbNames } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export default function BreadcrumbsBar() {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(Boolean);

    return (
        <Breadcrumb className="mx-auto pt-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-scr">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Филиал</BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    const translatedName = breadcrumbNames[segment] || decodeURIComponent(segment);

                    return (
                        <div key={href} className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>{translatedName}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href}>{translatedName}</BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
