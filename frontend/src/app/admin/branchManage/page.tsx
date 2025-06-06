'use client';

import useAuthGuard from '@/hooks/use-auth-guard';

export default function BranchManage() {
    useAuthGuard();

    return (
        <div className="space-y-6 mx-auto p-4 sm:p-9 w-full max-w-3xl px-4 sm:px-20 md:px-24 lg:px-12 bg-white h-full min-h-screen"></div>
    );
}
