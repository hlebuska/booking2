import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { H5 } from '@/components/ui/typography';

interface IProps {
    name: string;

    id: number | null;
    onClick: () => void;
}

export default function MasterDialogTrigger({ name, id, onClick }: IProps) {
    return (
        <div
            className={`flex items-start justify-between rounded-lg border p-2 sm:p-4 text-left text-sm transition-all bg-muted hover:bg-accent hover:bg-gray-50 cursor-pointer`}
            onClick={onClick}
        >
            {id ? (
                <>
                    <div className="flex gap-3 items-start">
                        <Avatar>
                            <AvatarImage
                                className="w-11"
                                src={
                                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                                }
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col ">
                            <H5 className="">{name}</H5>
                            <p className="leading-tight text-gray-700">Барбер</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-xs leading-tight text-gray-700">Стаж работы: 5л. 2мес.</p>
                    </div>
                </>
            ) : (
                <H5 className="">Выбрать мастера</H5>
            )}
        </div>
    );
}
