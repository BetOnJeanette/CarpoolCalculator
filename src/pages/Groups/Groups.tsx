import { createSignal, For, JSX, JSXElement } from "solid-js";
import { Group } from "../../classes/Group";
import { Accordion } from "@kobalte/core/accordion";
import { GroupCollapsible } from "../../components/Group/GroupCollapsible";
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
        UpdateGroups(Array.from(groups.values()))
    }
    AddGroup()
    return (
            <button class={styles.backButton} onClick={GoBack}>Back</button>
            <button class={styles.addButton} onClick={AddGroup}>Add group</button>
            <SubmitButton onSubmit={onSubmit} className={styles.submitButton}/>
        </div>
    )
}