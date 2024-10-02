import { JSX, onMount } from "solid-js";
import { Group } from "../../classes/Group";
import { Car } from "../../classes/Car";
import { SelectableLocation } from "../../classes/Location";
import { IRouteRequest } from "../../classes/IRouteRequest";
import axios from "axios";
import { MapAPIKey } from "../../AppContext";

interface IRequestSentProps {
    groups: Group[],
    cars: Car[]
    dest: SelectableLocation
}

export default function RequestSent({groups, cars, dest}: IRequestSentProps): JSX.Element {
    function GetRequestData(): IRouteRequest{
        const totalMembers = groups.reduce((accumulator, current) => accumulator + current.peopleCount, 0);
        const destJob = dest.GetDestinationJob(groups.length, totalMembers);
        const groupJobs =  groups.map((group, idx) => group.GetRequestJob(idx));
        const vehicles = cars.map((car, idx) => car.GetVehicleRequest(idx, dest))
        return {
            jobs: [...groupJobs, destJob],
            vehicles: vehicles
        }
    }
    
    onMount(async () => {
        const requestData = GetRequestData();
        const data = await axios.post("https://api.openrouteservice.org/optimization", requestData, { 
            headers: {
                "Authorization": MapAPIKey
            }
        });
        console.log(data)
    })

    return (<>
    
    </>)
}