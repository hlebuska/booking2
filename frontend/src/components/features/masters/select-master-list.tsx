import { IMaster } from '@/lib/types';
import MasterCard from './master-card';

interface IProps {
    masters: IMaster[];
    selectedMaster?: number | null;
    setMasterId: (id: number) => void;
}

export default function SelectMasterList({ masters, setMasterId, selectedMaster }: IProps) {
    return (
        <div className="flex flex-col gap-3 sm:gap-3">
            {masters && masters.length > 0 ? (
                masters?.map((master: IMaster) => (
                    <MasterCard
                        name={master.name}
                        key={master.id}
                        id={master.id}
                        setMasterId={setMasterId}
                        isSelected={master.id === selectedMaster}
                    />
                ))
            ) : (
                <>Нет доступных мастеров.</>
            )}
        </div>
    );
}
