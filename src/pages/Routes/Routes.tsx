import { JSX } from "solid-js"
import { ParsedRoute } from "../../classes/ParsedRoute"
import ListAccordion from "../../components/ListAccordion/ListAccordion"
import RouteCollapsible from "../../components/RouteCollapsible/RouteCollapsible"

interface IRoutesPageProps{
    OnBack(): void,
    routes: ParsedRoute[]
}

export default function RoutesPage({OnBack, routes}:IRoutesPageProps):JSX.Element {

    return (
        <ListAccordion ListElements={RouteCollapsible} existingData={routes} onBack={OnBack} />
    )
}