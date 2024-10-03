import { Car } from "./Car";
import { Group } from "./Group";
import { SelectableLocation } from "./Location";
import { IRoute } from "./Routes";
import { StepType } from "./RouteStep";

export class ParsedRoute {
    public Vehicle: Car;
    public PicksUp: Group[];
    public Destination: SelectableLocation;

    public constructor(route: IRoute, availableCars: Car[], availableGroups: Group[], destination: SelectableLocation){
        this.Vehicle = availableCars[route.vehicle];
        this.PicksUp = route.steps.filter(val => val.type === StepType.job).map(val => availableGroups[val.id]);
        this.Destination = destination;
    }
}