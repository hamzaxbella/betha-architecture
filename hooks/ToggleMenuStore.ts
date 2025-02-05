import {create} from 'zustand'

type ToggleMenuStore = {
    isOpen : boolean;
    toggleMenu : () => void;
    closeMenu : () => void;
    openMenu : () => void;
}


export const useToggleMenuStore = create<ToggleMenuStore>((set) => ({
    isOpen: false,
    toggleMenu: () => set((state) => ({isOpen: !state.isOpen})),
    closeMenu: () => set({isOpen: false}),
    openMenu: () => set({isOpen: true})
}))