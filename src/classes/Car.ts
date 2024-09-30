import { Group } from "./Group";

export class Car {
    public static defaultSeats = 5;

    public StartsWith: Group;
    public Seats = Car.defaultSeats;

    constructor(groupStart: Group, seatCount: number){
        [this.StartsWith, this.Seats] = [groupStart, seatCount];
    }
}