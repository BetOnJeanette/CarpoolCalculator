import { SelectableLocation } from "./Location"

export class Group {
    public static readonly defaultName = "Default Name"
    public static readonly defaultGroupSize = 1;
    public name: string
    public peopleCount: number
    public location: SelectableLocation
    
    constructor(name: string, peopleCount: number, location: SelectableLocation){
        [this.name, this.peopleCount, this.location] = [name, peopleCount, location]
    }
}