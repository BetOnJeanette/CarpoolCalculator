import { IJob } from "./Jobs";
import { IVehicle } from "./Vehicle";

export interface IRouteRequest {
    vehicles: IVehicle[];
    jobs: IJob[];
}