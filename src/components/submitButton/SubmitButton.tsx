import { Button } from "@kobalte/core/button";
import styles from "./SubmitButton.module.css"
import"../../styles/buttons.css"

interface ISubmitProps {
    onSubmit(): void;
    text?: string;
    className?: string;
}

export const SubmitButton = ({onSubmit, text, className}: ISubmitProps) => {
    return (
        <Button onclick={onSubmit} class={[styles.submitButton, "button", (className || "")].join(" ").trim()}>{text || "Submit"}</Button>
    )
    
}