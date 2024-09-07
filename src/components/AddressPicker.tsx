import { createAsyncOptions, createOptions, Select } from "@thisbeyond/solid-select";
import { Component, createSignal, useContext } from "solid-js";
import { GetBottleNeck, MapAPIKey, useAppContext } from "../AppContext";
import { FeatureResponse } from "../classes/FeatureResponse";
import axios from "axios";


interface QueryResponse {
    query: object,
    features: FeatureResponse[]
}

interface SelectableFeature extends FeatureResponse{
    name: string
}

const AddressPicker: Component = () => {
    const bottleneck = GetBottleNeck();
    const autofillURL = "https://api.openrouteservice.org/geocode/autocomplete?"
    const searchParams = new URLSearchParams();
    if (MapAPIKey == undefined) throw new Error("No API Access")
    searchParams.set("api_key", MapAPIKey)
    let options: FeatureResponse[]

    const fetchAutoComplete = async (inputVal: string): Promise<SelectableFeature[]> => {
        if (inputVal == "") return [];
        return await bottleneck.schedule( async() => {
            searchParams.set("text", inputVal)
            const search = autofillURL+searchParams.toString()
            const locations: QueryResponse  = await (await axios.get(search)).data
            return locations.features.map((val, idx) => {
                return {
                    name: val.properties.label,
                    ...val
                }
            })
        })
    };
    const props = createAsyncOptions(fetchAutoComplete) as any
    props.format = (val: SelectableFeature) => {return val.name}
    return <Select {...props} class="addressSelector"/>
}

export default AddressPicker