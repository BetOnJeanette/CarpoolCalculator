import Bottleneck from "bottleneck";
import { Accessor, Component, createContext, createSignal, ParentComponent, useContext } from "solid-js";
import { SelectableLocation } from "./classes/Location";

interface ContextData {
    searchPosition?: Accessor<number[]>
    UpdateSearchPosition(newLoc: number[] | SelectableLocation): void
    
}

const AppContext = createContext<ContextData>();

export const AppContextProvider: ParentComponent = (props) => {
    const [pos, setPos] = createSignal<number[]>([])
    function updatePos(newLoc: number[] | SelectableLocation) {
        if (newLoc instanceof SelectableLocation) setPos(newLoc.GetCoordinates());
        else setPos(newLoc); 
    }
    return (
        <AppContext.Provider value = {{
            searchPosition: pos,
            UpdateSearchPosition: updatePos
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
const requestsPerSecond = 5;
const throttleTime = requestsPerSecond / 1000;
const bottleneck =  new Bottleneck({
    minTime: throttleTime,
})

export function GetBottleNeck(){
    return bottleneck    
}

export const MapAPIKey = import.meta.env.VITE_API_KEY

export const useAppContext = () => useContext(AppContext)