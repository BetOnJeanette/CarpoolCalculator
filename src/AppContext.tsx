import Bottleneck from "bottleneck";
import { Component, createContext, ParentComponent, useContext } from "solid-js";

interface ContextData {

}

const AppContext = createContext<ContextData>();

export const AppContextProvider: ParentComponent = (props) => {
    return (
        <AppContext.Provider value = {{
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