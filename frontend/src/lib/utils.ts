import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deleteCookie, getCookie, setCookie } from './cookies';
import {
    GenericKeyInfo,
    ILogin,
    IMaster,
    IPatchService,
    IPostBooking,
    IService,
    SortOrderType,
    UpdateServicesRequestBody,
    IPatchMaster,
} from './types';

declare module 'axios' {
    export interface AxiosRequestConfig {
        isLoginRequest?: boolean;
    }
}

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

export const formatTime = (mins: number): string => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');

    return `${paddedHours}:${paddedMinutes}`;
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
    settings: 'Настройки',
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

export const getGenericKeys = <T extends Record<string, unknown>>(items?: T[]): GenericKeyInfo<T>[] => {
    if (!items || items.length === 0) return [];

    const keys = Object.keys(items[0])
        .filter((key) => key !== 'id')
        .map((key) => {
            return { key, type: typeof items[0][key] };
        });

    return keys;
};

export const sortByFn = <T extends Record<string, unknown>>(
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
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000/api',
    withCredentials: true,
});

const axiosRefreshClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000/api',
    withCredentials: true,
});

axiosApiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isLoginRequest = originalRequest.isLoginRequest === true;

        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
            originalRequest._retry = true;
            try {
                const refreshResponse = await refreshToken();

                //Update token
                const newAccessToken = refreshResponse.access;
                setCookie('access_token', newAccessToken);

                //Redo the original request
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                return axiosApiClient(originalRequest); // retry request
            } catch (refreshError) {
                deleteCookie('access_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        } else {
            throw error;
        }
    }
);

//CRUDS
export async function getMasters() {
    const { data } = await axiosApiClient.get('/v1/barbers/');
    return data;
}

export async function getMasterById(id: number) {
    const { data } = await axiosApiClient.get(`/v1/barbers/${id}`);
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
    const { data } = await axiosApiClient.post(`/v1/barbers/`, masterData);
    return data;
}

export async function deleteMaster(id: number) {
    const { data } = await axiosApiClient.delete(`/v1/barbers/${id}/`);
    return data;
}

export async function patchMaster(id: number, masterData: IPatchMaster) {
    const { data } = await axiosApiClient.patch(`/v1/barbers/${id}/`, masterData);
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
    const token = getCookie('access_token');

    const headers = token && role === 'admin' ? { Authorization: `Bearer ${token}` } : undefined;

    const { data } = await axiosApiClient.get(`/v1/barbers/${masterId}/services/?user_type=${role}`, { headers });

    return data;
}

export const updateMasterServices = async (masterId: number, data: UpdateServicesRequestBody) => {
    const res = await axiosApiClient.post(`/v1/barbers/${masterId}/set-services-status/`, data);
    return res.data;
};

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
    const { data } = await axiosApiClient.post(`token/`, loginData, {
        isLoginRequest: true,
    });
    return data;
}

export async function refreshToken() {
    const { data } = await axiosRefreshClient.post(`token/refresh/`, {}, { withCredentials: true });
    return data;
}

export async function verifyToken(token: string) {
    const data = await axiosApiClient.post(`token/verify/`, { token }, { withCredentials: true });
    return data;
}
