import { GeometryResponse } from "./GeometryResponse";
import { PropertiesResponse } from "./PropertiesResponse";

export interface FeatureResponse { 
    geometry: GeometryResponse,
    properties: PropertiesResponse
}