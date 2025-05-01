import { useLayoutEffect, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';

export const useSize = (target) => {
    const [size, setSize] = useState();

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect());
    }, [target]);

    useResizeObserver(target, (entry) => setSize(entry.contentRect));
    return size;
};
