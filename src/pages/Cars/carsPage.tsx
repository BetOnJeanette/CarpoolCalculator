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

export default function CarsPage({availableGroups, onSubmit, onBack}: ICarsProps):JSX.Element {
    const [cars, setCars] = createSignal<Array<Car | undefined>>([])
    
    function AddCar(){
        setCars([...cars(), undefined])
    }

    function RemoveCar(index: number){
        cars().splice(index, 1)
        setCars([...cars()])
    }
    
    function AttemptSubmit(){
        if(cars().length < 1) throw new Error("You need at least one car")
        const unfinishedIdx = cars().findIndex((val) => val === undefined);
        if (unfinishedIdx !== -1) throw new Error(`At least one is not finished: ${unfinishedIdx}`)
        onSubmit(cars().filter(val => val !== undefined))
    }

    AddCar()

    return (
        <div class={styles.carsPage}>
            <div class={styles.cars}>
                <For each={cars()}>{(item, idx) => <CarCollapsible existingCar={item} onChange={newItem => cars()[idx()] = newItem} onRemove={() => RemoveCar(idx())}availableGroups={availableGroups}/>}</For>
            </div>
            <button class={[styles.backButton, "button"].join(" ")} onClick={onBack}>Back</button>
            <button class={[styles.addButton, "button"].join(" ")} onClick={AddCar}>Add car</button>
            <SubmitButton className={styles.submitButton} onSubmit={AttemptSubmit} />
        </div>
    )
}