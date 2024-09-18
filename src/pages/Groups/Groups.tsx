import { createSignal, For, JSX, JSXElement } from "solid-js";
import { Group } from "../../classes/Group";
import { GroupCollapsible, IGroupCollapsibleResponse } from "../../components/Group/GroupCollapsible";
import styles from "./Groups.module.css"
import { SubmitButton } from "../../components/submitButton/SubmitButton";
import "../../styles/buttons.css"

interface IGroupsPageProps {
    BackUp(): void
    UpdateGroups(groups: Group[]): void
    groups?: Group[]
}

export default function GroupsPage({BackUp: GoBack, UpdateGroups, groups}: IGroupsPageProps){
    const [activeGroup, setActiveGroup] = createSignal<IGroupCollapsibleResponse>();
    const [GroupList, setGroupList] = createSignal<Array<IGroupCollapsibleResponse>>([]);

    function AddGroup() {
        CloseCurrentGroup();

        const newGroupsElement = GroupCollapsible({
            RemoveGroup: () => {
                const idx = GroupList().findIndex(val => val.UI === newGroupsElement.UI)
                GroupList().splice(idx, 1)
                setGroupList([...GroupList()])
                setActiveGroup(undefined)
            },
            RequestFocus: () => UpdateActiveKey(newGroupsElement)
        })
        GroupList().push(newGroupsElement)
        setGroupList([...GroupList()])
        UpdateActiveKey(newGroupsElement)
    }

    function ReAddGroups(groups: Group[]){
        setGroupList(groups.map(val => {
            const newGroupsElement = GroupCollapsible({
                RemoveGroup: () => {
                    const idx = GroupList().findIndex(val => val.UI === newGroupsElement.UI)
                    GroupList().splice(idx, 1)
                    setGroupList([...GroupList()])
                    setActiveGroup(undefined)
                },
                RequestFocus: () => UpdateActiveKey(newGroupsElement),
                group: val
            })
            return newGroupsElement;
        }))
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

    if(groups !== undefined && groups.length > 0) {
        ReAddGroups(groups);
    } else {
        AddGroup()
    }

    return (
        <div class={styles.groupPage}>
            <div class={styles.groups}>
                <For each={Array.from(GroupList()?.values() || [])}>{(item) => item.UI}</For>
            </div>
            <button class={[styles.backButton, "button"].join(" ")} onClick={GoBack}>Back</button>
            <button class={[styles.addButton, "button"].join(" ")} onClick={AddGroup}>Add group</button>
            <SubmitButton onSubmit={onSubmit} className={styles.submitButton}/>
        </div>
    )
}