import { Collapsible } from "@kobalte/core/collapsible";
import { Accessor, createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { TextField } from "@kobalte/core/text-field";
import { SelectableLocation } from "../../classes/Location";
import { NumberField } from "@kobalte/core/number-field";
import AddressPicker from "../AddressPicker/AddressPicker";
import { Button } from "@kobalte/core/button";
import styles from "./GroupCollapsible.module.css"
import { SubmitButton } from "../submitButton/SubmitButton";

interface IGroupCollapsibleProps{
    RemoveGroup(key: number): void
    SetAsOpen(key: number): void
    CurrentActiveKey: Accessor<number>
    key: number
}

export interface IGroupCollapsibleResponse{
    UI: JSX.Element
    IsValid(): boolean
    GroupData(): Group
}

export function GroupCollapsible({RemoveGroup, SetAsOpen, CurrentActiveKey, key}: IGroupCollapsibleProps): IGroupCollapsibleResponse {
    const defaultName = "Group Name";
    const defaultGroupSize = 1;

    const [name, setName] = createSignal<string>(defaultName);
    const [groupSize, setGroupSize] = createSignal<number>(defaultGroupSize)
    const [startingPoint, setStartingPoint] = createSignal<SelectableLocation>()

    function OnChangeOpen(open: boolean){
        if (open) {
            SetAsOpen(key);
        } else {
            if (!isValid()) throw new Error("Not a vaild group")
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
        UI:(<Collapsible open={key === CurrentActiveKey()} onOpenChange={OnChangeOpen} class={styles.groupCard}>
            <Collapsible.Trigger class={styles.trigger}>
                <span>{name()}</span>
            </Collapsible.Trigger>
            <Collapsible.Content class={styles.collapsibleCard}>
                <TextField defaultValue={defaultName} onChange={setName} class={styles.namePicker}>
                    <TextField.Label>Group Name</TextField.Label>
                    <TextField.Input />
                </TextField>
                <NumberField rawValue={groupSize()} onRawValueChange={setGroupSize} class={styles.groupSize} minValue={0}>
                    <NumberField.Label>Group Size</NumberField.Label>
                    <div class={styles.groupSizePicker}>
                        <NumberField.Input class={styles.groupSizeInput}/>
                        <NumberField.IncrementTrigger>+</NumberField.IncrementTrigger>  
                        <NumberField.DecrementTrigger>-</NumberField.DecrementTrigger>  
                    </div>
                </NumberField>
                <AddressPicker updateAddress={setStartingPoint} classNames={styles.addressPicker}/>
                <Button onClick={() => RemoveGroup(key)}>Remove Group</Button>
            </Collapsible.Content>
        </Collapsible>),
        IsValid: isValid,
        GroupData: getGroupData
    }
}