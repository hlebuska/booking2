export const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.075,
        },
    },
};

export const cardVariants = {
    hidden: { opacity: 0, y: -12 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
        },
    },
};

export const slotVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
};

export const springFadeInVariant = {
    hidden: { scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: 'spring',
            bounce: 0.2,
            duration: 0.1 + Math.random() * 0.2,
        },
    },
};
