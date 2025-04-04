import React from 'react';

export const H2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <h2
            className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`}
            {...props}
        >
            {children}
        </h2>
    );
};

export const H3: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`} {...props}>
            {children}
        </h3>
    );
};

export const H4: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <h4 className={`scroll-m-20 text-md sm:text-xl font-semibold tracking-tight ${className}`} {...props}>
            {children}
        </h4>
    );
};

export const H5: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <h5
            className={`scroll-m-20 text-sm sm:text-base/none leading-none font-medium  tracking-tight ${className}`}
            {...props}
        >
            {children}
        </h5>
    );
};

export const Body1: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <p className={`scroll-m-20 text-sm sm:text-base/none leading-none tracking-tight ${className}`} {...props}>
            {children}
        </p>
    );
};

export const Body2: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
    return (
        <p className={`scroll-m-20 text-xs sm:text-base/none leading-none tracking-tight ${className}`} {...props}>
            {children}
        </p>
    );
};
