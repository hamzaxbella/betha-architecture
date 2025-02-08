import {create} from 'zustand'


interface SlugStoreProps {
    slug : string,
    setSlug : (slug : string) => void
}

export const SlugStore = create<SlugStoreProps>((set) => ({
    slug : "",
    setSlug  : (slug : string) => set({slug})
}))