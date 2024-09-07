import { createAsyncOptions, Select } from "@thisbeyond/solid-select";
import { Component, createSignal, useContext } from "solid-js";
import { GetBottleNeck, MapAPIKey, useAppContext } from "../AppContext";
import { FeatureResponse } from "../classes/FeatureResponse";
import axios from "axios";


interface QueryResponse {
    query: object,
    features: FeatureResponse[]
}

const AddressPicker: Component = () => {
    const [PreviousSearchText, SetPreviousSerachText] = createSignal("");
    const bottleneck = GetBottleNeck();
    const autofillURL = "https://api.openrouteservice.org/geocode/autocomplete?"
    const searchParams = new URLSearchParams();
    if (MapAPIKey == undefined) throw new Error("No API Access")
    searchParams.set("api_key", MapAPIKey)

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
    return <Select {...props}/>
}

export default AddressPicker