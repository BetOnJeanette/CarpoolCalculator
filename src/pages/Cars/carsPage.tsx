import { createSignal, For, JSX } from "solid-js";
import styles from "./cars.module.css"
import CarCollapsible from "../../components/CarCollapsible/CarsCollapsible";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { SubmitButton } from "../../components/submitButton/SubmitButton";
import { Accordion } from "@kobalte/core/accordion";
import { IListCollapsible } from "../../components/ListCollapsible/ListCollapsible";
import ListAccordion from "../../components/ListAccordion/ListAccordion";

interface ICarsProps {
    availableGroups: Group[]
    existingCars: Car[]
    onSubmit(cars: Car[]): void
    onBack(): void
}

export default function CarsPage({availableGroups, onSubmit, onBack, existingCars}: ICarsProps):JSX.Element {

    function getCarCollapsible(collapsibleData: IListCollapsible<Car>){
        return <CarCollapsible {...collapsibleData} availableGroups={availableGroups} />
    }


    return (
        <ListAccordion existingData={existingCars} onSubmit={onSubmit} onBack={onBack} ListElements={getCarCollapsible}/>
    )
}