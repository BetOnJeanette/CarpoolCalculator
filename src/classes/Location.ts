import { FeatureResponse } from "./FeatureResponse";
import { GeometryResponse } from "./GeometryResponse";
import { IDropoffJob } from "./Jobs";
import { PropertiesResponse } from "./PropertiesResponse";

export class SelectableLocation {
    public location: GeometryResponse;
    public label: string = ""


    constructor(feature: FeatureResponse){
        this.location = feature.geometry;
        this.label = this.GetLabel(feature.properties);

    }

    private GetLabel(properties: PropertiesResponse): string {
        const elementsToUse = [properties.name]
        if (properties.housenumber !== undefined && properties.street !== undefined && properties.locality !== undefined) {
            elementsToUse.push([properties.housenumber, properties.street].join(" "), properties.locality);
        }
        elementsToUse.push(properties.region_a, properties.country_a)
        return elementsToUse.join(", ")
    }

    public GetCoordinates(){ 
        return this.location.coordinates
    }

    public GetDestinationJob(id: number, totalMembers: number): IDropoffJob{
        return {
            id: id,
            description: "Destination",
            location: this.GetCoordinates(),
            delivery: [totalMembers]
        }
    }
}