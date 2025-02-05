import {create} from 'zustand'

type LayoutStore ={
    isRtl : boolean;
    setRtl : () => void;
    unsetRtl : () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
    isRtl: false,
    setRtl: () => set({isRtl: true}),
    unsetRtl: () => set({isRtl: false})     
}))