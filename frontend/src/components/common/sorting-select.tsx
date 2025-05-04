/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { springFadeInVariant } from '@/lib/animations';
import { GenericKeyInfo, SortOrderType } from '@/lib/types';
import { translateProp } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { Dispatch, SetStateAction } from 'react';

interface IProps<T extends Record<string, any>> {
    selectedSortKey?: string;
    setSelectedSortKey: Dispatch<SetStateAction<string | undefined>>;
    setSortOrder: Dispatch<SetStateAction<SortOrderType>>;
    keys: GenericKeyInfo<T>[];
}
export default function SortingSelect<T extends Record<string, any>>({
    selectedSortKey,
    setSelectedSortKey,
    setSortOrder,
    keys,
}: IProps<T>) {
    return (
        <div className="flex gap-2">
            {/* Sorting By Select */}
            <motion.div
                variants={springFadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 mt-2 relative w-1/2 xs:w-1/3"
            >
                <Select defaultValue="no" onValueChange={(value) => setSelectedSortKey(value)}>
                    <SelectTrigger className=" gap-2 text-zinc-500">
                        <SelectValue placeholder="Без сортировки" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={'no'}>Без сортировки</SelectItem>
                            {keys.map((key, index) => (
                                <SelectItem value={key.key as string} key={index}>
                                    {translateProp(key.key as string)}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </motion.div>
            {/* Asc/Desc Select */}
            <motion.div
                variants={springFadeInVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 mt-2 relative w-1/2 xs:w-1/4"
            >
                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center ml-[9px] pointer-events-none w-4 h-4 text-zinc-500"></div>

                <Select
                    defaultValue="asc"
                    onValueChange={(value) => setSortOrder(value as SortOrderType)}
                    disabled={selectedSortKey === 'no'}
                >
                    <SelectTrigger className="pl-8 gap-2 text-zinc-500">
                        <SelectValue placeholder="По возр." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem className="pl-8" value={'asc'}>
                                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                    <ArrowUp color="#85858d" strokeWidth={1.75} />
                                </div>
                                По возр.
                            </SelectItem>
                            <SelectItem className="pl-8" value={'desc'}>
                                <div className="absolute inset-y-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none w-4 h-4 text-zinc-500 left-[9px]">
                                    <ArrowDown color="#85858d" strokeWidth={1.75} />
                                </div>
                                По убыв.
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </motion.div>
        </div>
    );
}
