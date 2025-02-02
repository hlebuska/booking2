import { IMaster, SetNumberStateType } from '@/lib/type/types';
import MasterCard from './master-card';

interface IProps {
    masters: IMaster[];
    selectedMaster?: number | null;
    setMasterId: SetNumberStateType;
}

export default function SelectList({ masters, setMasterId, selectedMaster }: IProps) {
    return (
        <div className="flex flex-col gap-3 sm:gap-3">
            {masters.map((master: IMaster) => (
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
