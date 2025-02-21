import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            serviceIdState: null,
            masterIdState: null,
            branchIdState: null,

            setServiceId: (serviceIdState: number) => set({ serviceIdState }),
            setMasterId: (masterIdState: number) => set({ masterIdState }),
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
