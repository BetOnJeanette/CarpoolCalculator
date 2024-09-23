import { Group } from "./Group"

export default class GroupWrapper {
    public name: string
    public group: Group
    public disabled = false;
    public constructor(group: Group){
        this.group = group;
        this.name = group.name
    }
}