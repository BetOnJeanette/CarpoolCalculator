export enum StepType {
    start = "start",
    job = "job", 
    pickup = "pickup", 
    delivery = "delivery", 
    break = "break", 
    end = "end"
}
export interface IRouteStep {
    type: StepType,
    id: number
}