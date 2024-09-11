import { Collapsible } from "@kobalte/core/collapsible";
import { Accessor, createSignal, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { TextField } from "@kobalte/core/text-field";
import { SelectableLocation } from "../../classes/Location";
import { NumberField } from "@kobalte/core/number-field";
import AddressPicker from "../AddressPicker/AddressPicker";
import { Button } from "@kobalte/core/button";

interface IGroupCollapsibleProps{
    UpdateGroup(key: number, group: Group): void
    RemoveGroup(key: number): void
    SetAsOpen(key: number): void
    CurrentActiveKey: Accessor<number>
    key: number
}

export function GroupCollapsible({UpdateGroup, RemoveGroup, SetAsOpen, CurrentActiveKey, key}: IGroupCollapsibleProps): JSX.Element {
    const defaultName = "Group Name";
    const defaultGroupSize = 1;

    const [name, setName] = createSignal<string>(defaultName);
    const [groupSize, setGroupSize] = createSignal<number>(defaultGroupSize)
    const [startingPoint, setStartingPoint] = createSignal<SelectableLocation>()

    function OnChangeOpen(open: boolean){
        if (open) {
            SetAsOpen(key);
        } else {
            const currentStartingPoint = startingPoint();
            if (currentStartingPoint === undefined) throw Error()
            else UpdateGroup(key, new Group(name(), groupSize(), currentStartingPoint))
        }
    }

    return (
        <Collapsible open={key === CurrentActiveKey()} onOpenChange={OnChangeOpen}>
            <Collapsible.Trigger>
                <span>{name()}</span>
            </Collapsible.Trigger>
            <Collapsible.Content >
                <TextField defaultValue={defaultName} onChange={setName}>
                    <TextField.Label>Group Name</TextField.Label>
                    <TextField.Input />
                </TextField>
                <NumberField rawValue={groupSize()} onRawValueChange={setGroupSize} minValue={0}>
                    <NumberField.Label>Group Size</NumberField.Label>
                    <div class="groupSizePicker">
                        <NumberField.Input />
                        <NumberField.IncrementTrigger /> 
                        <NumberField.DecrementTrigger /> 
                    </div>
                </NumberField>
                <AddressPicker updateAddress={setStartingPoint}/>
                <Button onClick={() => RemoveGroup(key)}></Button>
            </Collapsible.Content>
        </Collapsible>
    )
}