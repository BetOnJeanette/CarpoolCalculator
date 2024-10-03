import { IPickupJob } from "./Jobs";
import { SelectableLocation } from "./Location"

export class Group {
    public static readonly defaultName = "Default Name"
    public static readonly defaultGroupSize = 1;
    public id: number
    public name: string
    public peopleCount: number
    public location: SelectableLocation
    
    constructor(id: number, name: string, peopleCount: number, location: SelectableLocation){
        [this.id, this.name, this.peopleCount, this.location] = [id, name, peopleCount, location]
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