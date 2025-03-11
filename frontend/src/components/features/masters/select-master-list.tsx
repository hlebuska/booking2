import { IMaster } from '@/lib/type/types';
import MasterCard from './master-card';

interface IProps {
    masters: IMaster[];
    selectedMaster?: number | null;
    setMasterId: (id: number) => void;
}

export default function SelectMasterList({ masters, setMasterId, selectedMaster }: IProps) {
    return (
        <div className="flex flex-col gap-3 sm:gap-3">
            {masters?.map((master: IMaster) => (
                //close on select
                <MasterCard
                    name={master.name}
                    key={master.id}
                    id={master.id}
                    setMasterId={setMasterId}
                    isSelected={master.id === selectedMaster}
                />
            ))}
        </div>
    );
}
