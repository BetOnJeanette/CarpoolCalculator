import { Collapsible } from "@kobalte/core/collapsible";
import { createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { TextField } from "@kobalte/core/text-field";
import { SelectableLocation } from "../../classes/Location";
import { NumberField } from "@kobalte/core/number-field";
import AddressPicker from "../AddressPicker/AddressPicker";
import { Button } from "@kobalte/core/button";
import styles from "./GroupCollapsible.module.css"
import "../../styles/buttons.css"
import "../../styles/collapsible.css"
import "../../styles/inputStyles.css"
import CountPicker from "../CountPicker/CountPicker";

interface IGroupCollapsibleProps{
    RemoveGroup(): void
    RequestFocus(): void
    group?: Group
}

export interface IGroupCollapsibleResponse{
    UI: JSX.Element
    setOpen(open: boolean): void
    IsValid(): boolean
    GroupData(): Group
}

export function GroupCollapsible({RemoveGroup, RequestFocus, group}: IGroupCollapsibleProps): IGroupCollapsibleResponse {
    const defaultName = "Group Name";
    const defaultGroupSize = 1;

    const [open, setOpen] = createSignal<boolean>(true)
    const [name, setName] = createSignal<string>(group?.name || defaultName);
    const [groupSize, setGroupSize] = createSignal<number>(group?.peopleCount || defaultGroupSize)
    const [startingPoint, setStartingPoint] = createSignal<SelectableLocation>()
    if (group !== undefined) setStartingPoint(group.location);

    function OnChangeOpen(open: boolean){
        if (!open) {
            if (!isValid()) throw new Error("Not a vaild group")
            setOpen(false)
        } else {
            RequestFocus()
        }
        
    }

    function isValid() {
        return startingPoint() !== undefined;
    }

    function getGroupData() {
        if (!isValid()) throw new Error("Not valid group data")
        return new Group(name(), groupSize(), startingPoint() as SelectableLocation)
    }

    return {
        UI:(<Collapsible open={open()} onOpenChange={OnChangeOpen} class="collapsibleContainer">
            <Collapsible.Trigger class="trigger">
                <span>{name()}</span>
            </Collapsible.Trigger>
            <Collapsible.Content class={[styles.collapsibleCard, "collapsible"].join(" ")}>
                <TextField defaultValue={name() || defaultName} onChange={setName} class={styles.namePicker}>
                    <TextField.Label class={styles.inputLabel}>Group Name</TextField.Label>
                    <TextField.Input class="input"/>
                </TextField>
                <CountPicker onChange={setGroupSize} defaultValue={groupSize()} className={styles.groupSize} />
                <AddressPicker updateAddress={setStartingPoint} classNames={styles.addressPicker} defaultText={startingPoint()?.label}/>
                <Button onClick={RemoveGroup} class="button">Remove Group</Button>
            </Collapsible.Content>
        </Collapsible>),
        IsValid: isValid,
        GroupData: getGroupData,
        setOpen: setOpen
    }
}