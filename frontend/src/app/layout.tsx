'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import BreadcrumbsBar from '@/components/ui/breadcrumbs-bar';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <QueryClientProvider client={queryClient}>
                <body className={`${geistSans.variable} ${geistMono.variable} w-full max-w-full bg-zinc-100 `}>
                    <BreadcrumbsBar />
                    <Toaster />
                    {children}
                </body>
            </QueryClientProvider>
        </html>
    );
}
