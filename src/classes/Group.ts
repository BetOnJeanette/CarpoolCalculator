import { SelectableLocation } from "./Location"

export class Group {
    public name: string
    public peopleCount: number
    public location: SelectableLocation
    
    constructor(name: string, peopleCount: number, location: SelectableLocation){
        [this.name, this.peopleCount, this.location] = [name, peopleCount, location]
    }
}