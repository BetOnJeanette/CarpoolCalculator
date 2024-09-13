import { createAsyncOptions, createOptions, Select } from "@thisbeyond/solid-select";
import { Component, createSignal, useContext } from "solid-js";
import { GetBottleNeck, MapAPIKey, useAppContext } from "../../AppContext";
import { FeatureResponse } from "../../classes/FeatureResponse";
import axios from "axios";
import "./addressPicker.css"
import "@thisbeyond/solid-select/style.css"
import { SelectableLocation } from "../../classes/Location";
import { className } from "solid-js/web";

interface QueryResponse {
    query: object,
    features: FeatureResponse[]
}

interface PickerProps {
    updateAddress: (value: SelectableLocation) => void
    classNames?: string
}

const AddressPicker: Component<PickerProps> = ({classNames, updateAddress}: PickerProps) => {
    const bottleneck = GetBottleNeck();
    const autofillURL = "https://api.openrouteservice.org/geocode/autocomplete?"
    const searchParams = new URLSearchParams();
    if (MapAPIKey == undefined) throw new Error("No API Access")
    searchParams.set("api_key", MapAPIKey)

    const fetchAutoComplete = async (inputVal: string): Promise<SelectableLocation[]> => {
        if (inputVal == "") return [];
        return await bottleneck.schedule( async() => {
            searchParams.set("text", inputVal)
            const search = autofillURL+searchParams.toString()
            const locations: QueryResponse  = await (await axios.get(search)).data
            return locations.features.map( feature => new SelectableLocation(feature))
        })
    };
    const props = createAsyncOptions(fetchAutoComplete) as any
    props.format = (val: SelectableLocation) => {return val.label}
    return <Select placeholder="Pick a destination..." autofocus={true} {...props} class={["addressPicker", classNames].join(" ").trim()} onChange={updateAddress}/>
}

export default AddressPicker