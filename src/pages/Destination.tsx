import { Component, createSignal } from "solid-js";
import {Select, createAsyncOptions} from "@thisbeyond/solid-select"
import AddressPicker from "../components/AddressPicker";

const Destination: Component = () => {


    return <div>
        <AddressPicker />
    </div>
}

export { Destination }