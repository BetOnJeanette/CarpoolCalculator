import { IRouteStep } from "./RouteStep";

export interface IRoute {
    steps: IRouteStep[];
    vehicle: number
}