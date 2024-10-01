import { Group } from "../../classes/Group";
import { GroupCollapsible} from "../../components/Group/GroupCollapsible";
import "../../styles/buttons.css"
import ListAccordion from "../../components/ListAccordion/ListAccordion";

interface IGroupProps {
    existingGroups: Group[]
    onBack(): void
    onSubmit(groups: Group[]): void
}

export default function GroupsPage({onBack, onSubmit, existingGroups}: IGroupProps){
    return (
        <ListAccordion existingData={existingGroups} onSubmit={onSubmit} onBack={onBack} ListElements={GroupCollapsible} />
    )
}