'use client';

import AdminNavbar from '@/components/common/admin-navbar';
import BreadcrumbsBar from '@/components/common/breadcrumbs-bar';
import { ConfirmDialog } from '@/components/common/confirm-dialog';
import GlobalDialog from '@/components/common/global-dialog';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/utils';
import { QueryClientProvider } from '@tanstack/react-query';
import './globals.css';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <body className={`w-full max-w-full bg-zinc-100 `}>
                    <BreadcrumbsBar />
                    <AdminNavbar />
                    <Toaster />
                    <ConfirmDialog />
                    <GlobalDialog />
                    {children}
                </body>
            </QueryClientProvider>
        </html>
    );
}
