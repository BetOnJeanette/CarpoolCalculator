import { createAsyncOptions, createOptions, Select } from "@thisbeyond/solid-select";
import { Component, createSignal, useContext } from "solid-js";
import { GetBottleNeck, MapAPIKey, useAppContext } from "../AppContext";
import { FeatureResponse } from "../classes/FeatureResponse";
import axios from "axios";
import "./addressPicker.css"
import "@thisbeyond/solid-select/style.css"

interface QueryResponse {
    query: object,
    features: FeatureResponse[]
}

interface PickerProps {
    updateAddress: (value: FeatureResponse) => void
}

const AddressPicker: Component = () => {
    const bottleneck = GetBottleNeck();
    const autofillURL = "https://api.openrouteservice.org/geocode/autocomplete?"
    const searchParams = new URLSearchParams();
    if (MapAPIKey == undefined) throw new Error("No API Access")
    searchParams.set("api_key", MapAPIKey)
    let options: FeatureResponse[]

    const fetchAutoComplete = async (inputVal: string): Promise<FeatureResponse[]> => {
        if (inputVal == "") return [];
        return await bottleneck.schedule( async() => {
            searchParams.set("text", inputVal)
            const search = autofillURL+searchParams.toString()
            const locations: QueryResponse  = await (await axios.get(search)).data
            return locations.features
        })
    };
    const props = createAsyncOptions(fetchAutoComplete) as any
    props.format = (val: FeatureResponse) => {return val.properties.label}
    return <Select placeholder="Pick a destination..." autofocus={true} {...props} class="addressPicker"/>
}

export default AddressPicker