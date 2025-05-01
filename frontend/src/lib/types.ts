export interface IMaster {
    id: number;
    name: string;
    description: string;
}

export interface ISlot {
    id: string;
    time: string;
    is_available: boolean;
}

export interface IService {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    selected?: boolean;
}

export type SetNumberStateType = React.Dispatch<React.SetStateAction<number | null>>;
export type SetBooleanStateType = React.Dispatch<React.SetStateAction<boolean>>;

//CRUDS interfaces
export interface IPostBooking {
    name: string;
    comment?: string;
    phone_number: string;
    barber: number;
    time_slot: number;
    service_id: number;
}

export interface IPatchService {
    name?: string;
    description?: string;
    duration?: number;
    price?: number;
}

export interface IPatchMaster {
    name?: string;
    description?: string;
}

export type SortOrderType = 'asc' | 'desc';

export type GenericKeyInfo<T> = {
    key: keyof T;
    type: string;
};

export interface ILogin {
    username: string;
    password: string;
}

export interface ChangedServicesMap {
    [serviceId: number]: boolean;
}

export interface UpdateServicesRequestBody {
    services: ChangedServicesMap;
}
