import { Accordion } from "@kobalte/core/accordion";
import { createSignal, For, JSX } from "solid-js";
import { SubmitButton } from "../submitButton/SubmitButton";
import { IListCollapsible } from "../ListCollapsible/ListCollapsible";
import styles from "./ListAccordion.module.css"


interface IAccordionListProps<ReturnType>{
    onSubmit(list: ReturnType[]): void
    onBack(): void
    ListElements(CollapsibleData: IListCollapsible<ReturnType>): JSX.Element
}

export default function ListAccordion<ListType>({onSubmit, onBack, ListElements}: IAccordionListProps<ListType>){
    const ALL_CLOSED = -1

    const [list, setList] = createSignal<Array<ListType | undefined>>([])
    const [currentOpen, setCurrentOpen] = createSignal<number>(ALL_CLOSED)


    function IsCurrentValid() {
        return currentOpen() === ALL_CLOSED || list()[currentOpen()] !== undefined;
    }
    
    function ShowValidationIssue(){
        throw new Error("The current item is not valid")
    }

    function AddToList(){
        if(!IsCurrentValid()) ShowValidationIssue()
        setList([...list(), undefined])
        setCurrentOpen(list().length - 1)
    }

    function RemoveFromList(index: number){
        list().splice(index, 1)
        setList([...list()])
        setCurrentOpen(ALL_CLOSED)
    }
    
    function AttemptSubmit(){
        if(list().length < 1) throw new Error("You need at least one item")
        const unfinishedIdx = list().findIndex((val) => val === undefined);
        if (unfinishedIdx !== -1) throw new Error(`At least one is not finished: ${unfinishedIdx}`)
        onSubmit(list().filter(val => val !== undefined))
    }

    function AttemptChangeOpen(newOpen: string[]){
        if (!IsCurrentValid()) ShowValidationIssue()
        const newKey = newOpen.length > 0 ? parseInt(newOpen[0]) : -1
        setCurrentOpen(newKey)
    }

    AddToList()

        return(
            <div class={styles.listPage}>
                <Accordion collapsible={true} class={styles.list} value={[currentOpen().toString()]} onChange={AttemptChangeOpen}>
                    <For each={list()}>
                        {(item, idx) => 
                            <ListElements
                                existingData={item} 
                                onChange={newItem => list()[idx()] = newItem}
                                key={idx}
                                onRemove={() => RemoveFromList(idx())}/>
                        }
                    </For>
                </Accordion>
                <button class={[styles.backButton, "button"].join(" ")} onClick={onBack}>Back</button>
                <button class={[styles.addButton, "button"].join(" ")} onClick={AddToList}>Add car</button>
                <SubmitButton className={styles.submitButton} onSubmit={AttemptSubmit} />
            </div>
        )

}