import { createSignal, JSX } from "solid-js";
import styles from "./cars.module.css"
import CarCollapsible from "../../components/CarCollapsible/CarsCollapsible";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { SubmitButton } from "../../components/submitButton/SubmitButton";

interface ICarsProps {
    availableGroups: Group[]
    onSubmit(cars: Car[]): void
}

export default function CarsPage({availableGroups, onSubmit}: ICarsProps):JSX.Element {
    const [car, setCar] = createSignal<Car>()
    return (
        <div>
            <div class={styles.carsPage}>
             <CarCollapsible availableGroups={availableGroups} onChange={(car) => {setCar(car); console.log(car)}}/>
            </div>
            <SubmitButton onSubmit={() => onSubmit([car() as Car])} />
        </div>
    )
}