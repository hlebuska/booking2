import { Button } from '@/components/ui/button';
import { H4, H5 } from '@/components/ui/typography';
import { EllipsisVertical, Pencil, Trash2 } from 'lucide-react';

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// todo: dropdown shadcn
export default function ServiceInfoCard() {
    return (
        <div className="flex flex-col gap-3 items-start justify-between rounded-lg bordersm:p-4 text-left text-sm transition-all p-3 bg-muted outline-none outline-offset-0  border overflow-hidden">
            <div className="flex justify-between items-center w-full">
                <H4>Борода 1 головы первой категории</H4>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="p-2">
                            <EllipsisVertical />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Услуга</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Pencil />
                                <span>Редактировать</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Trash2 />
                                <span>Удалить</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex flex-col gap-[6px]">
                <p>
                    <b>Описание: </b>Мужская стрижка выполняется машинкой и ножницами. В услугу входит:-подбор стрижки,
                    -мытье головы до и после стрижки, -стрижка,-укладка профессиональными средствами
                </p>
                <p>
                    <b>Длительность: </b>1ч
                </p>
                <p>
                    <b>Стоимость: </b> 100000 т
                </p>
            </div>

            <div className="flex flex-col xs:flex-row-reverse gap-2 w-full"></div>
        </div>
    );
}
