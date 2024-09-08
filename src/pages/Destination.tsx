import { Component, createSignal } from "solid-js";
import {Select, createAsyncOptions} from "@thisbeyond/solid-select"
import AddressPicker from "../components/AddressPicker/AddressPicker";
import { useAppContext } from "../AppContext";
import { FeatureResponse } from "../classes/FeatureResponse";

const Destination: Component = () => {
    const [dest, setDest] = createSignal<FeatureResponse>()
    const contextData = useAppContext();
    if (contextData === null ) throw new Error();

    return <div>
        <AddressPicker updateAddress={setDest}/>
    </div>
}

export { Destination }