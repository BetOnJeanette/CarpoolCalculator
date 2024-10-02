import { Group } from "./Group"

export default class GroupWrapper {
    public name: string
    public group: Group
    public disabled = false;
    public id: number
    
    public constructor(group: Group, id: number){
        this.group = group;
        this.name = group.name
        this.id = id
    }
}