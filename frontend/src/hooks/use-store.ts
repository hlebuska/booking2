import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
    serviceIdState: number | null;
    masterIdState: number | null;
    branchIdState: number | null;
    accessToken: string | null;
};

type Action = {
    setServiceId: (serviceIdState: number) => void;
    setMasterId: (masterIdState: number | null) => void;
    setBranchId: (branchIdState: number) => void;
    setAccessToken: (accessToken: string | null) => void;
};

const useStore = create<State & Action>()(
    devtools(
        persist(
            (set) => ({
                serviceIdState: null,
                masterIdState: null,
                branchIdState: null,
                accessToken: null,

                setServiceId: (serviceIdState: number) => set({ serviceIdState }),
                setMasterId: (masterIdState: number | null) => set({ masterIdState }),
                setBranchId: (branchIdState: number) => set({ branchIdState }),
                setAccessToken: (accessToken: string | null) => set({ accessToken }),

                clearServiceId: () => set({ serviceIdState: null }),
                clearMasterId: () => set({ masterIdState: null }),
                clearBranchId: () => set({ branchIdState: null }),

                clearAll: () => set({ serviceIdState: null, masterIdState: null, branchIdState: null }),
            }),
            { name: 'bookingState' }
        ),
        { name: 'Zustand Store' }
    )
);

export default useStore;
