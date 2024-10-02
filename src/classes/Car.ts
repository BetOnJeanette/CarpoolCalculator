import { Group } from "./Group";
import { SelectableLocation } from "./Location";
import { IVehicle } from "./Vehicle";

export class Car {
    public static defaultSeats = 5;

    public StartsWith: Group;
    public Seats = Car.defaultSeats;

    constructor(groupStart: Group, seatCount: number){
        [this.StartsWith, this.Seats] = [groupStart, seatCount];
    }

    public GetVehicleRequest(id:number, dest: SelectableLocation): IVehicle {
        return {
            id: id,
            start: this.StartsWith.location.GetCoordinates(),
            end: dest.GetCoordinates(),
            capacity: [this.Seats]
        }
    }
}