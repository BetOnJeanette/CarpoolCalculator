import { Accessor, createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { Select } from "@kobalte/core/select";
import GroupWrapper from "../../classes/GroupWrapper";
import "../../styles/collapsible.css"
import styles from "./CarsCollapsible.module.css"
import CountPicker from "../CountPicker/CountPicker";
import { Button } from "@kobalte/core/button";
import { Accordion } from "@kobalte/core/accordion";
import { IListCollapsible } from "../ListCollapsible/ListCollapsible";

interface ICarProps extends IListCollapsible<Car> {
    availableGroups: Group[]
}

export default function CarCollapsible({existingData, availableGroups, key, onChange, onRemove}: ICarProps): JSX.Element {
    const [carOwner, setCarOwner] = createSignal<Group>();
    const [seatCount, setSeatCount] = createSignal<number>(Car.defaultSeats);
    if (existingData !== undefined) {
        setCarOwner(existingData.StartsWith);
        setSeatCount(existingData.Seats);
    }

    const options = availableGroups.map((val) => new GroupWrapper(val))

    function GetCarData(): Car | undefined{
        const currentOwner = carOwner()
        if (currentOwner === undefined) return undefined;
        return new Car(currentOwner, seatCount())
    }

    function updateCarOwner(newOwner: Group | null){ 
        setCarOwner(newOwner || undefined)
        onChange(GetCarData())
    }

    function updateSeatCount(seats: number){
        setSeatCount(seats) 
        onChange(GetCarData())
    }

    function getDefaultGroup(){
        const currentOwner = carOwner()
        if (currentOwner === undefined) return undefined
        return new GroupWrapper(currentOwner)
    }

    return (
        <Accordion.Item class="collapsibleContainer" value={key().toString()}>
            <Accordion.Header class={styles.header}>
                <Accordion.Trigger class="trigger">
                    {carOwner()?.name || "New car"}
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class={[styles.carCollapsible, "collapsible"].join(" ")}>
                <Select 
                    class={styles.ownerPicker}
                    options={options} 
                    optionTextValue="name" 
                    optionDisabled="disabled" 
                    optionValue="group" 
                    defaultValue={getDefaultGroup()}
                    placeholder={"Who does the car start with?"} 
                    onChange={(group) => updateCarOwner(group?.group || null)} itemComponent={props => (
                    <Select.Item item={props.item} class={styles.selectItem}> 
                        <Select.ItemLabel>{props.item.rawValue.name}</Select.ItemLabel>
                    </Select.Item>
                )}> 
                    <Select.Label class="inputLabel">Car Owner</Select.Label>
                    <Select.Trigger class="input">
                        <Select.Value<Group>>
                            {state => state.selectedOption().name}
                        </Select.Value>
                        <Select.Arrow />
                    </Select.Trigger>
                    <Select.Portal>
                        <Select.Content class={styles.ownerPickerContent}>
                            <Select.Listbox class={styles.optionList}/>
                        </Select.Content>
                    </Select.Portal>
                </Select>
                <CountPicker defaultValue={Car.defaultSeats} onChange={updateSeatCount} label="Available Seats" />
                <Button class="button" onClick={onRemove}>Remove Car</Button>
            </Accordion.Content>
        </Accordion.Item>
    )
}