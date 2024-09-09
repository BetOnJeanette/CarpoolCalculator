import { Component, createSignal } from "solid-js";
import {Select, createAsyncOptions} from "@thisbeyond/solid-select"
import AddressPicker from "../components/AddressPicker/AddressPicker";
import { useAppContext } from "../AppContext";
import { FeatureResponse } from "../classes/FeatureResponse";
import { Button } from "@suid/material";
import { SubmitButton } from "../components/submitButton/SubmitButton";
import styles from "./Destination.module.css"

interface IDestinationProps {
    onSubmitDest: (dest: FeatureResponse) => void
}

const Destination: Component<IDestinationProps> = ({onSubmitDest}: IDestinationProps) => {
    const [dest, setDest] = createSignal<FeatureResponse>()
    const contextData = useAppContext();
    if (contextData === null ) throw new Error();
    
    const submitDestination = () => {
        const chosenDest = dest()
        if (chosenDest === undefined) throw new Error("No destination chosen")
        onSubmitDest(chosenDest)
    }

    return <div class={styles.destPicker}>
        <AddressPicker updateAddress={setDest}/>
        <SubmitButton onSubmit={submitDestination}></SubmitButton>
    </div>
}

export { Destination }