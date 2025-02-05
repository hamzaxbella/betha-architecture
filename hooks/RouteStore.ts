import {create} from 'zustand'

type RouteStore =  {
    currentRoute : string,
    setCurrentRoute : (route : string) => void
}

export const useRouteStore = create<RouteStore>((set) => ({
    currentRoute : "/",
    setCurrentRoute : (route : string) => set({currentRoute : route})
}))