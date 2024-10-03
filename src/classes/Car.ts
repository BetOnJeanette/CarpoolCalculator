import { Group } from "./Group";
import { SelectableLocation } from "./Location";
import { IVehicle } from "./Vehicle";

export class Car {
    public static defaultSeats = 5;

    public id: number
    public StartsWith: Group;
    public Seats = Car.defaultSeats;

    constructor(id: number, groupStart: Group, seatCount: number){
        [this.id, this.StartsWith, this.Seats] = [id, groupStart, seatCount];
    }

    public GetVehicleRequest(id:number, dest: SelectableLocation): IVehicle {
        const defaultProfile = "driving-car"
        return {
            id: id,
            start: this.StartsWith.location.GetCoordinates(),
            end: dest.GetCoordinates(),
            capacity: [this.Seats],
            profile: defaultProfile
        }
    }
}