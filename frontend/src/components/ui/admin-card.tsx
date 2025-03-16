'use client';

import { H4 } from '@/components/ui/typography';
import React from 'react';

const AdminCard = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex flex-col items-start justify-between rounded-lg p-3 bg-muted outline-none border overflow-hidden">
            {children}
        </div>
    );
};

const AdminCardHeader = ({ children }: { children?: React.ReactNode }) => {
    return <div className="relative flex items-center w-full mb-2">{children}</div>;
};

const AdminCardTitle = ({ children }: { children?: React.ReactNode }) => {
    return <H4 className="absolute left-1/2 transform -translate-x-1/2 text-center">{children}</H4>;
};

const AdminCardRow = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="w-full border-t last:border-b  py-1 text-xs xs:text-sm flex gap-3 items-center border-collapse">
            {children}
        </div>
    );
};

const AdminCardRowTitle = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="w-3/12 truncate text-center border-r flex-grow-0 flex-shrink-0 ">
            <b>{children}</b>
        </div>
    );
};

const AdminCardRowDescription = ({
    children,
    truncate = false,
}: {
    children?: React.ReactNode;
    truncate?: boolean;
}) => {
    return <div className={`w-8/12 ${truncate ? 'line-clamp-1' : 'break-words'}`}>{children}</div>;
};

AdminCard.Header = AdminCardHeader;
AdminCard.Title = AdminCardTitle;
AdminCard.Row = AdminCardRow;
AdminCard.RowTitle = AdminCardRowTitle;
AdminCard.RowDescription = AdminCardRowDescription;

export default AdminCard;
