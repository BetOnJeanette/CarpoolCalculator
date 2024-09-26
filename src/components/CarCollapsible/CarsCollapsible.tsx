import { createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { Collapsible } from "@kobalte/core/collapsible";
import { Car } from "../../classes/Car";
import { Select } from "@kobalte/core/select";
import { NumberField } from "@kobalte/core/number-field";
import GroupWrapper from "../../classes/GroupWrapper";
import "../../styles/collapsible.css"
import styles from "./CarsCollapsible.module.css"
import CountPicker from "../CountPicker/CountPicker";

interface ICarProps {
    owner?: Group
    seats?: number
    availableGroups: Group[]
    onChange(updatedCar: Car): void
}

export default function CarCollapsible({owner, seats, onChange, availableGroups}: ICarProps): JSX.Element {
    const [carOwner, setCarOwner] = createSignal<Group>();
    const [seatCount, setSeatCount] = createSignal<number>(Car.defaultSeats);
    if (owner !== undefined) setCarOwner(owner);
    if (seats !== undefined) setSeatCount(seats);

    const options = availableGroups.map((val) => new GroupWrapper(val))

    function GetCarData(): Car{
        const currentOwner = carOwner()
        if (currentOwner === undefined) throw new Error("No driver for the car")
        return new Car(currentOwner, seatCount())
    }

    function updateCarOwner(newOwner: Group | null){ 
        console.log(newOwner)
        setCarOwner(newOwner || undefined)
        try {
            onChange(GetCarData())
        } catch {

        }
    }

    function updateSeatCount(seats: number){
        setSeatCount(seats) 
        try {
            onChange(GetCarData())
        } catch {
            
        }
    }

    function getDefaultGroup(){
        const currentOwner = carOwner()
        if (currentOwner === undefined) return undefined
        return new GroupWrapper(currentOwner)
    }
    return (
            <Collapsible class="collapsibleContainer">
                <Collapsible.Trigger class="trigger">
                    <span>{carOwner()?.name || "new car"}</span>
                </Collapsible.Trigger>
                <Collapsible.Content class={[styles.carCollapsible, "collapsible"].join(" ")}>
                    <Select 
                        class={styles.ownerPicker}
                        options={options} 
                        optionTextValue="name" 
                        optionDisabled="disabled" 
                        optionValue="group" 
                        defaultValue={getDefaultGroup()}
                        placeholder={"Who does the car start with?"} 
                        onChange={(group) => updateCarOwner(group?.group || null)} itemComponent={props => (
                        <Select.Item item={props.item}> 
                            <Select.ItemLabel>{props.item.rawValue.name}</Select.ItemLabel>
                        </Select.Item>
                    )}> 
                        <Select.Label></Select.Label>
                        <Select.Trigger>
                            <Select.Value<Group>>
                                {state => state.selectedOption().name}
                            </Select.Value>
                            <Select.Arrow />
                        </Select.Trigger>
                        <Select.Portal>
                            <Select.Content>
                                <Select.Listbox />
                            </Select.Content>
                        </Select.Portal>
                    </Select>
                    <CountPicker defaultValue={Car.defaultSeats} onChange={updateSeatCount} label="Available Seats" />
                </Collapsible.Content>
            </Collapsible>
        )
}