import { For, JSX } from "solid-js";
import { ParsedRoute } from "../../classes/ParsedRoute";
import { IListCollapsible } from "../ListCollapsible/ListCollapsible";
import { Accordion } from "@kobalte/core/accordion";

export default function RouteCollapsible({existingData, key}: IListCollapsible<ParsedRoute>): JSX.Element {
    if (existingData === undefined) throw new Error("A route must be provided");

    return (
        <Accordion.Item value={key().toString()} class="collapsibleContainer">
            <Accordion.Header class="header">
                <Accordion.Trigger class="trigger">
                    {existingData.Vehicle.StartsWith.name}
                </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content class="collapsible">
                <ol>
                    <li>Starts with {existingData.Vehicle.StartsWith.name} at {existingData.Vehicle.StartsWith.location.label}</li>
                    <For each={existingData.PicksUp}>{(group) => <li>Picks up {group.name} at {group.location.label}</li>}</For>
                    <li>Arrives at {existingData.Destination.label}</li>
                </ol>
            </Accordion.Content>
        </Accordion.Item>
    )
}