import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GenericKeyInfo, IMaster, IPatchService, IPostBooking, IService, SortOrderType } from './type/types';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

//Misc
export const phoneRegex = new RegExp(/^\+7\s?7\d{2}\s?\d{3}\s?\d{4}$/);

export const formatDuration = (duration: number): string => {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return `${hours ? `${hours} ч.` : ''} ${minutes ? `${minutes} мин.` : ''}`.trim();
};

export const breadcrumbNames: Record<string, string> = {
    '': 'Главная',
    branchSelect: 'Филиал',
    serviceSelect: 'Услуги',
    masterTimeSelect: 'Мастер и время',
    admin: 'Администрирование',
    serviceManage: 'Настройка услуг',
    masterManage: 'Настройка мастеров',
    branchManage: 'Настройка филиалов',
};

//Filters
export const filterServices = (service: IService, searchTerm: string) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase());

export const filterMasters = (master: IMaster, searchTerm: string) =>
    master.name.toLowerCase().includes(searchTerm.toLowerCase());

//Sorting stuff
export const sortingPropNames: Record<string, string> = {
    name: 'По названию',
    price: 'По цене',
    description: 'По описанию',
    duration: 'По длительности',
};

export const translateProp = (prop: string): string => {
    return sortingPropNames[prop] || prop;
};

export const getGenericKeys = <T extends Record<string, any>>(items?: T[]): GenericKeyInfo<T>[] => {
    if (!items || items.length === 0) return [];

    const keys = Object.keys(items[0])
        .filter((key) => key !== 'id')
        .map((key) => {
            return { key, type: typeof items[0][key] };
        });

    return keys;
};

export const sortByFn = <T extends Record<string, any>>(
    items: T[],
    sortBy: GenericKeyInfo<T>,
    order: SortOrderType = 'asc'
) => {
    if (!sortBy) return items;
    const sorted = [...items];

    if (sortBy.type === 'string') {
        sorted.sort((a, b) => String(a[sortBy.key]).localeCompare(String(b[sortBy.key])));
    } else if (sortBy.type === 'number') {
        sorted.sort((a, b) => Number(a[sortBy.key]) - Number(b[sortBy.key]));
    }
    return order == 'asc' ? sorted : sorted.reverse();
};

//Fetching
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

//Masters
export async function deleteMaster(id: number) {
    try {
        const { data } = await axiosApiClient.delete(`barbers/${id}/`);
        return data;
    } catch (error) {
        throw error;
    }
}

//Services
export async function getServices() {
    const { data } = await axiosApiClient.get(`services/`);
    return data;
}

export async function getMastersServices(masterId: number) {
    const { data } = await axiosApiClient.get(`barbers/${masterId}/services/`);
    return data.services;
}

export async function postService(serviceData: Omit<IService, 'id'>) {
    try {
        const { data } = await axiosApiClient.post(`services/`, serviceData);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteService(id: number) {
    try {
        const { data } = await axiosApiClient.delete(`services/${id}/`);
        return data;
    } catch (error) {
        throw error;
    }
}

export async function patchService(id: number, serviceData: IPatchService) {
    try {
        const { data } = await axiosApiClient.patch(`services/${id}/`, serviceData);
        return data;
    } catch (error) {
        throw error;
    }
}
