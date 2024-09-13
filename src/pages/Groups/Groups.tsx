import { createSignal, For, JSX } from "solid-js";
import { Group } from "../../classes/Group";
import { Accordion } from "@kobalte/core/accordion";
import { GroupCollapsible } from "../../components/Group/GroupCollapsible";

interface IGroupsPageProps {
    BackUp(): void
    UpdateGroups(groups: Group[]): void
}

export default function GroupsPage({BackUp: GoBack, UpdateGroups}: IGroupsPageProps){
    let lastKey = 0;
    const [currentKey, setcurrentKey] = createSignal<number>(lastKey);
    const GroupList: Array<JSX.Element> = [];

    const groups = new Map<number, Group>()


    function AddGroup() {
        const groupKey = lastKey;
        const newGroupsElement = GroupCollapsible({
            UpdateGroup: (key, group) => {
                groups.set(key, group);
                setcurrentKey(-1)
            },
            RemoveGroup: (key) => {
                groups.delete(key)
                setcurrentKey(key - 1)
            },
            CurrentActiveKey: currentKey,
            SetAsOpen: setcurrentKey,
            key: groupKey
        })
        lastKey++;
        GroupList.push(newGroupsElement)
    }

    function onSubmit() {
        UpdateGroups(Array.from(groups.values()))
    }
    AddGroup()
    return (
        <div class="Groups">
            <For each={GroupList}>{(item, index) => item}</For>
        </div>
    )
}