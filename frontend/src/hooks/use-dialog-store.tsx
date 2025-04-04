import { create } from 'zustand';

interface IDialogOptions {
    content: JSX.Element;
    title?: string;
    description?: string;
}

interface IDialogStore {
    content: JSX.Element | null;
    title: string;
    description: string;
    isOpen: boolean;

    openDialog: (options: IDialogOptions) => void;
    setOpen: (isOpen: boolean) => void;
}

export const useDialogStore = create<IDialogStore>((set) => ({
    content: null,
    title: '',
    description: '',
    isOpen: false,

    setOpen: (isOpen) => set({ isOpen }),
    openDialog: ({ content, title = '', description = '' }) => set({ content, title, description, isOpen: true }),
}));
