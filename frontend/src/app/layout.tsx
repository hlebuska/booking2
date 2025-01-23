'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/utils';

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
                <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
            </QueryClientProvider>
        </html>
    );
}
