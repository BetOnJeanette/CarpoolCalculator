import { Button } from "@kobalte/core/button";
import styles from "./SubmitButton.module.css"

interface ISubmitProps {
    onSubmit(): void;
    text?: string
}

export const SubmitButton = ({onSubmit, text}: ISubmitProps) => {
    return (
        <Button onclick={onSubmit} class={styles.submitButton}>{text || "Submit"}</Button>
    )
    
}