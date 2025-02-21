import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IPostBooking } from './type/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const phoneRegex = new RegExp(/^\+7\s?7\d{2}\s?\d{3}\s?\d{4}$/);

export const breadcrumbNames: Record<string, string> = {
    '': 'Главная',
    branchSelect: 'Филиал',
    serviceSelect: 'Услуги',
    masterTimeSelect: 'Мастер и время',
};

export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export const axiosApiClient = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8000/api/v1',
});

//CRUDS
export async function getMasters() {
    const { data } = await axiosApiClient.get('/barbers');
    return data;
}

export async function getScheduleByMaster(masterId: number) {
    const { data } = await axiosApiClient.get(`barbers/${masterId}/schedules/`);
    return data;
}

export async function postBooking(bookingData: IPostBooking) {
    try {
        const { data } = await axiosApiClient.post(`booking/`, bookingData);
        return data;
    } catch (error) {
        throw error; // Ensure error is properly handled
    }
}
