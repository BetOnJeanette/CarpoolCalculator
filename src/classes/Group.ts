import { IPickupJob } from "./Jobs";
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

    public GetRequestJob(id: number): IPickupJob{
        return {
            id: id,
            description: this.name,
            location: this.location.GetCoordinates(),
            pickup: [this.peopleCount]
        }
    }
}