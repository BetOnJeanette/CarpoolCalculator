import { JSX } from "solid-js";
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
                
            </Accordion.Content>
        </Accordion.Item>
    )
}