import IconInput from '@/components/ui/icon-input';
import { springFadeInVariant } from '@/lib/animation-varitants';

import { SearchIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface IProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: IProps) {
    return (
        <motion.div
            variants={springFadeInVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col gap-3"
        >
            <IconInput icon={<SearchIcon strokeWidth={2} />} value={value} onChange={onChange} />
        </motion.div>
    );
}
