import {create} from 'zustand'

type FilterStore = {
    selectedFilter : string;
    setSelectedFilter : (filter : string) => void

}


export const useFilter = create<FilterStore>((set) => ({
    selectedFilter : 'all',
    setSelectedFilter : (filter : string) => set({selectedFilter : filter})
}))