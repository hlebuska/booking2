import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GenericKeyInfo, ILogin, IMaster, IPatchService, IPostBooking, IService, SortOrderType } from './types';
import useStore from '@/hooks/use-store';

//Misc
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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
    success: 'Успешная запись',
    login: 'Авторизация',
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

    sorted.sort((a, b) => {
        const aVal = a[sortBy.key];
        const bVal = b[sortBy.key];

        const aNum = Number(aVal);
        const bNum = Number(bVal);

        const aIsNumber = !isNaN(aNum);
        const bIsNumber = !isNaN(bNum);

        if (aIsNumber && bIsNumber) {
            return aNum - bNum;
        }

        return String(aVal).localeCompare(String(bVal));
    });

    return order == 'asc' ? sorted : sorted.reverse();
};

//Fetching
export const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });

export const axiosApiClient = axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:8000/api',
});

axiosApiClient.interceptors.request.use(
    (config) => {
        const token = useStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosApiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Optionally reset auth state or redirect to login
            useStore.getState().setAccessToken(null);
        }
        return Promise.reject(error);
    }
);

//CRUDS
export async function getMasters() {
    const { data } = await axiosApiClient.get('/v1/barbers');
    return data;
}

export async function getScheduleByMaster(masterId: number, role: 'admin' | 'client') {
    const { data } = await axiosApiClient.get(`/v1/barbers/${masterId}/schedules/?user_type=${role}`);
    return data;
}

export async function postBooking(bookingData: IPostBooking) {
    const { data } = await axiosApiClient.post(`/v1/booking/`, bookingData);
    return data;
}

//Masters
export async function postMaster(masterData: Omit<IMaster, 'id'>) {
    const { data } = await axiosApiClient.post(`/v1/masters/`, masterData);
    return data;
}

export async function deleteMaster(id: number) {
    const { data } = await axiosApiClient.delete(`/v1/barbers/${id}/`);
    return data;
}

//Services
export async function getServices() {
    const { data } = await axiosApiClient.get(`/v1/services/`);
    return data;
}

export async function getServiceById(id: number) {
    const { data } = await axiosApiClient.get(`/v1/services/${id}`);
    return data;
}

export async function getMastersServices(masterId: number, role: 'admin' | 'client') {
    const { data } = await axiosApiClient.get(`/v1/barbers/${masterId}/services/?user_type=${role}`);
    return data;
}

export async function postService(serviceData: Omit<IService, 'id'>) {
    const { data } = await axiosApiClient.post(`/v1/services/`, serviceData);
    return data;
}

export async function deleteService(id: number) {
    const { data } = await axiosApiClient.delete(`/v1/services/${id}/`);
    return data;
}

export async function patchService(id: number, serviceData: IPatchService) {
    const { data } = await axiosApiClient.patch(`/v1/services/${id}/`, serviceData);
    return data;
}

//Auth

export async function login(loginData: ILogin) {
    const { data } = await axiosApiClient.post(`token/`, loginData);
    return data;
}
