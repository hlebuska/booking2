import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
    serviceIdState: number | null;
    masterIdState: number | null;
    branchIdState: number | null;
};

type Action = {
    setServiceId: (serviceIdState: number) => void;
    setMasterId: (masterIdState: number | null) => void;
    setBranchId: (branchIdState: number) => void;
};

const useStore = create<State & Action>()(
    persist(
        (set) => ({
            serviceIdState: null,
            masterIdState: null,
            branchIdState: null,

            setServiceId: (serviceIdState: number) => set({ serviceIdState }),
            setMasterId: (masterIdState: number | null) => set({ masterIdState }),
            setBranchId: (branchIdState: number) => set({ branchIdState }),

            clearServiceId: () => set({ serviceIdState: null }),
            clearMasterId: () => set({ masterIdState: null }),
            clearBranchId: () => set({ branchIdState: null }),

            clearAll: () => set({ serviceIdState: null, masterIdState: null, branchIdState: null }),
        }),
        { name: 'bookingState' }
    )
);

export default useStore;
