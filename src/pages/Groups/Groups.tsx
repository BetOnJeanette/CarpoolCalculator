import { createSignal, For, JSX, JSXElement } from "solid-js";
import { Group } from "../../classes/Group";
import { Accordion } from "@kobalte/core/accordion";
import { GroupCollapsible } from "../../components/Group/GroupCollapsible";
import styles from "./Groups.module.css"
import { SubmitButton } from "../../components/submitButton/SubmitButton";

interface IGroupsPageProps {
    BackUp(): void
    UpdateGroups(groups: Group[]): void
}

export default function GroupsPage({BackUp: GoBack, UpdateGroups}: IGroupsPageProps){
    let lastKey = 0;
    const [currentKey, setCurrentKey] = createSignal<number>(lastKey);
    const [GroupList, setGroupList] = createSignal<Array<JSX.Element>>([]);
    const groups = new Map<number, Group>()

    function AddGroup() {
        const groupKey = lastKey;
        const newGroupsElement = GroupCollapsible({
            UpdateGroup: (key, group) => {
                groups.set(key, group);
                setCurrentKey(-1)
            },
            RemoveGroup: (key) => {
                groups.delete(key)
                setCurrentKey(key - 1)
            },
            CurrentActiveKey: currentKey,
            SetAsOpen: setCurrentKey,
            key: groupKey
        })
        lastKey++;
        setGroupList(new Array<JSX.Element>(GroupList(), newGroupsElement))
    }

    function onSubmit() {
        if(groups.size === 0) throw new Error("Need at least one group");
        UpdateGroups(Array.from(groups.values()));
    }

    AddGroup()
    return (
        <div class={styles.groupPage}>
            <div class={styles.groups}>
                <For each={GroupList()}>{(item, index) => item}</For>
            </div>
            <button class={styles.backButton} onClick={GoBack}>Back</button>
            <button class={styles.addButton} onClick={AddGroup}>Add group</button>
            <SubmitButton onSubmit={onSubmit} className={styles.submitButton}/>
        </div>
    )
}