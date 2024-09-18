import { Component, createSignal } from "solid-js";
import AddressPicker from "../../components/AddressPicker/AddressPicker";
import { useAppContext } from "../../AppContext";
import { SubmitButton } from "../../components/submitButton/SubmitButton";
import styles from "./Destination.module.css"
import { SelectableLocation } from "../../classes/Location";

interface IDestinationProps {
    onSubmitDest: (dest: SelectableLocation) => void
    currentDest?: SelectableLocation
}

const Destination: Component<IDestinationProps> = ({onSubmitDest, currentDest}: IDestinationProps) => {
    const [dest, setDest] = createSignal<SelectableLocation>()
    if (currentDest !== undefined) setDest(currentDest)

    const contextData = useAppContext();
    if (contextData === null ) throw new Error();
    
    const submitDestination = () => {
        const chosenDest = dest()
        if (chosenDest === undefined) throw new Error("No destination chosen")
        onSubmitDest(chosenDest)
    }

    return <div class={styles.destPicker}>
        <AddressPicker updateAddress={setDest} defaultText={currentDest?.label}/>
        <SubmitButton onSubmit={submitDestination}></SubmitButton>
    </div>
}

export { Destination }