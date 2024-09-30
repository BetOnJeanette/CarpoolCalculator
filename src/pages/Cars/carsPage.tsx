import { createSignal, For, JSX } from "solid-js";
import styles from "./cars.module.css"
import CarCollapsible from "../../components/CarCollapsible/CarsCollapsible";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { SubmitButton } from "../../components/submitButton/SubmitButton";
import { Accordion } from "@kobalte/core/accordion";

interface ICarsProps {
    availableGroups: Group[]
    onSubmit(cars: Car[]): void
    onBack(): void
}

export default function CarsPage({availableGroups, onSubmit, onBack}: ICarsProps):JSX.Element {
    const [cars, setCars] = createSignal<Array<Car | undefined>>([])
    const [currentOpen, setCurrentOpen] = createSignal<number>(-1)
    const ALL_CLOSED = -1

    function IsCurrentValid() {
        return currentOpen() === ALL_CLOSED || cars()[currentOpen()] !== undefined;
    }
    
    function ShowValidationIssue(){
        throw new Error("The current car is not valid")
    }

    function AddCar(){
        if(!IsCurrentValid()) ShowValidationIssue()
        setCars([...cars(), undefined])
        setCurrentOpen(cars().length - 1)
    }

    function RemoveCar(index: number){
        cars().splice(index, 1)
        setCars([...cars()])
        setCurrentOpen(ALL_CLOSED)
    }
    
    function AttemptSubmit(){
        if(cars().length < 1) throw new Error("You need at least one car")
        const unfinishedIdx = cars().findIndex((val) => val === undefined);
        if (unfinishedIdx !== -1) throw new Error(`At least one is not finished: ${unfinishedIdx}`)
        onSubmit(cars().filter(val => val !== undefined))
    }

    function AttemptChangeOpen(newOpen: string[]){
        if (!IsCurrentValid()) ShowValidationIssue()
        const newKey = newOpen.length > 0 ? parseInt(newOpen[0]) : -1
        setCurrentOpen(newKey)
    }

    AddCar()

    return (
        <div class={styles.carsPage}>
            <Accordion collapsible={true} class={styles.cars} value={[currentOpen().toString()]} onChange={AttemptChangeOpen}>
                <For each={cars()}>
                    {(item, idx) => 
                        <CarCollapsible 
                            existingCar={item} 
                            onChange={newItem => cars()[idx()] = newItem}
                            key={idx}
                            onRemove={() => RemoveCar(idx())}
                            availableGroups={availableGroups}/>
                    }
                </For>
            </Accordion>
            <button class={[styles.backButton, "button"].join(" ")} onClick={onBack}>Back</button>
            <button class={[styles.addButton, "button"].join(" ")} onClick={AddCar}>Add car</button>
            <SubmitButton className={styles.submitButton} onSubmit={AttemptSubmit} />
        </div>
    )
}