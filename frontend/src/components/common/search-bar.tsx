import IconInput from '@/components/ui/icon-input';
import { SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface IProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: IProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.2,
            }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
        >
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={value} onChange={onChange} />
        </motion.div>
    );
}
