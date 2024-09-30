import { createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { TextField } from "@kobalte/core/text-field";
import { SelectableLocation } from "../../classes/Location";
import AddressPicker from "../AddressPicker/AddressPicker";
import { Button } from "@kobalte/core/button";
import styles from "./GroupCollapsible.module.css"
import "../../styles/buttons.css"
import "../../styles/collapsible.css"
import "../../styles/inputStyles.css"
import CountPicker from "../CountPicker/CountPicker";
import { IListCollapsible } from "../ListCollapsible/ListCollapsible";
import { Accordion } from "@kobalte/core/accordion";


export function GroupCollapsible({existingData, key, onChange, onRemove}: IListCollapsible<Group>): JSX.Element {
    const [name, setName] = createSignal<string>(existingData?.name || Group.defaultName);
    const [groupSize, setGroupSize] = createSignal<number>(existingData?.peopleCount || Group.defaultGroupSize)
    const [startingPoint, setStartingPoint] = createSignal<SelectableLocation>()
    
    if (existingData !== undefined){
        setStartingPoint(existingData.location)
    }

    function isValid() {
        return startingPoint() !== undefined;
    }

    function getGroupData(): Group | undefined {
        if (!isValid()) return undefined;
        return new Group(name(), groupSize(), startingPoint() as SelectableLocation);
    }

    function UpdateName(newName: string){
        setName(newName);
        onChange(getGroupData());
    }

    function UpdateGroupSize(newSize: number){
        setGroupSize(newSize);
        onChange(getGroupData());
    }

    function UpdateStartingPoint(newLocation?: SelectableLocation){
        setStartingPoint(newLocation);
        onChange(getGroupData())
    }

    return (
        <Accordion.Item class="collapsibleContainer" value={key().toString()}>
            <Accordion.Header class="header">
                <Accordion.Trigger class="trigger">
                    {name()}
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion class={[styles.collapsibleCard, "collapsible"].join(" ")}>
                <TextField defaultValue={name() || Group.defaultName} onChange={UpdateName} class={styles.namePicker}>
                    <TextField.Label class={styles.inputLabel}>Group Name</TextField.Label>
                    <TextField.Input class="input"/>
                </TextField>
                <CountPicker onChange={UpdateGroupSize} defaultValue={groupSize()} className={styles.groupSize} label="Group Size"/>
                <AddressPicker updateAddress={UpdateStartingPoint} classNames={styles.addressPicker} defaultText={startingPoint()?.label}/>
                <Button onClick={onRemove} class="button">Remove Group</Button>
            </Accordion>
        </Accordion.Item>)
}