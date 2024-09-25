import { NumberField } from "@kobalte/core/number-field"
import styles from "./CountPicker.module.css"

interface ICountPickerProps {
    onChange(newCount: number): void
    defaultValue: number
    className?: string
}

export default function CountPicker({onChange, defaultValue, className}: ICountPickerProps){
    return (
        <NumberField rawValue={defaultValue} onRawValueChange={onChange} class={[styles.numField, className].join(" ")} minValue={0}>
            <NumberField.Label class={styles.inputLabel}>Group Size</NumberField.Label>
            <div class={styles.groupSizePicker}>
                <NumberField.Input class={[styles.groupSizeInput, styles.input].join(" ")}/>
                <NumberField.IncrementTrigger class="button">+</NumberField.IncrementTrigger>  
                <NumberField.DecrementTrigger class="button">-</NumberField.DecrementTrigger>  
            </div>
        </NumberField>
    )
}