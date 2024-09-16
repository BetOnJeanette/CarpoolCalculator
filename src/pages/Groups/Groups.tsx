import { createSignal, For, JSX, JSXElement } from "solid-js";
import { Group } from "../../classes/Group";
import { Accordion } from "@kobalte/core/accordion";
import { GroupCollapsible, IGroupCollapsibleResponse } from "../../components/Group/GroupCollapsible";
import styles from "./Groups.module.css"
import { SubmitButton } from "../../components/submitButton/SubmitButton";

interface IGroupsPageProps {
    BackUp(): void
    UpdateGroups(groups: Group[]): void
}

export default function GroupsPage({BackUp: GoBack, UpdateGroups}: IGroupsPageProps){
    const [activeGroup, setActiveGroup] = createSignal<IGroupCollapsibleResponse>();
    const [GroupList, setGroupList] = createSignal<Array<IGroupCollapsibleResponse>>([]);

    function AddGroup() {
        CloseCurrentGroup();

        const newGroupsElement = GroupCollapsible({
            RemoveGroup: () => {
                const idx = GroupList().findIndex(val => val.UI === newGroupsElement.UI)
                GroupList().splice(idx, 1)
                setGroupList([...GroupList()])
            },
            RequestFocus: () => UpdateActiveKey(newGroupsElement)
        })
        GroupList().push(newGroupsElement)
        setGroupList([...GroupList()])
        UpdateActiveKey(newGroupsElement)
    }

    function UpdateActiveKey(group: IGroupCollapsibleResponse) {
        CloseCurrentGroup()
        if (activeGroup() === group) {
            setActiveGroup(undefined)
        } else {
            group.setOpen(true)
            setActiveGroup(group)
        }
    }

    function CloseCurrentGroup(){
        const currentGroup = activeGroup()
        if(currentGroup !== undefined) {
            if(!currentGroup.IsValid()) throw Error("Clean up current group first");
            currentGroup.setOpen(false)
        }
    }

    function onSubmit() {
        if(GroupList().length === 0) throw new Error("Need at least one group");
        if(GroupList().find((val) => !val.IsValid()) !== undefined) throw new Error("At least one group is not valid")
        UpdateGroups(GroupList().map(group => group.GroupData()));
    }

    AddGroup()
    return (
        <div class={styles.groupPage}>
            <div class={styles.groups}>
                <For each={Array.from(GroupList()?.values() || [])}>{(item) => item.UI}</For>
            </div>
            <button class={styles.backButton} onClick={GoBack}>Back</button>
            <button class={styles.addButton} onClick={AddGroup}>Add group</button>
            <SubmitButton onSubmit={onSubmit} className={styles.submitButton}/>
        </div>
    )
}