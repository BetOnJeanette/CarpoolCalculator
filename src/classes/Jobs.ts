export interface IJob {
    id: number,
    description?: string
    location: number[],   
}

export interface IPickupJob extends IJob{
    pickup: number[]
}

export interface IDropoffJob extends IJob {
    delivery: number[]
}