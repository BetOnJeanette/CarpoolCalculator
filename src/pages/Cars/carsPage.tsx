import { createSignal, For, JSX } from "solid-js";
import styles from "./cars.module.css"
import CarCollapsible from "../../components/CarCollapsible/CarsCollapsible";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { SubmitButton } from "../../components/submitButton/SubmitButton";

interface ICarsProps {
    availableGroups: Group[]
    onSubmit(cars: Car[]): void
    onBack(): void
}

interface IControlGroup {
    UI: JSX.Element
    Car?: Car
}

export default function CarsPage({availableGroups, onSubmit, onBack}: ICarsProps):JSX.Element {
    const [cars, setCars] = createSignal<IControlGroup[]>([])
    
    function AddCar(){
        const newGroup:IControlGroup = {
            UI: (<CarCollapsible availableGroups={availableGroups} onChange={(val) => newGroup.Car = val}/>)
        }
        setCars([...cars(), newGroup])
    }
    
    function AttemptSubmit(){
        const unfinishedIdx = cars().findIndex((val) => val.Car === undefined);
        if (unfinishedIdx !== -1) throw new Error(`At least one is not finished: ${unfinishedIdx}`)
        onSubmit(cars().map(val => val.Car).filter(val => val !== undefined))
    }

    return (
        <div class={styles.carsPage}>
            <div class={styles.cars}>
                <For each={cars()}>{(item) => item.UI}</For>
            </div>
            <button class={[styles.backButton, "button"].join(" ")} onClick={onBack}>Back</button>
            <button class={[styles.addButton, "button"].join(" ")} onClick={AddCar}>Add car</button>
            <SubmitButton className={styles.submitButton} onSubmit={AttemptSubmit} />
        </div>
    )
}