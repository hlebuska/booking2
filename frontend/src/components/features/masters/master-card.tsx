import { H5 } from '@/components/ui/typography';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

interface IProps {
    name: string;
    id: number;
    setMasterId?: (id: number) => void;
    isSelected?: boolean;
}

export default function MasterCard({ name, id, setMasterId, isSelected }: IProps) {
    const imgURL = isSelected
        ? 'https://static-00.iconduck.com/assets.00/tick-circle-icon-512x511-tdqse5ra.png'
        : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';

    return (
        <div
            className={`flex w-full items-start justify-between rounded-lg border p-2 sm:p-4 text-left text-sm transition-all bg-white hover:bg-accent hover:bg-gray-50 cursor-pointer`}
            onClick={() => {
                if (setMasterId) {
                    setMasterId(id);
                }
            }}
        >
            <div className="flex gap-3 items-start">
                <Avatar className="flex justify-center items-center">
                    <AvatarImage className="w-11" src={imgURL} />
                    <AvatarFallback>Selected</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ">
                    <H5 className="">{name}</H5>
                    <p className="leading-tight text-gray-700">Барбер</p>
                </div>
            </div>

            <div>
                <p className="text-xs leading-tight text-gray-700">Стаж работы: 5л. 2мес.</p>
            </div>
        </div>
    );
}
