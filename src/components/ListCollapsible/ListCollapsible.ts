import { Accessor } from "solid-js"

export interface IListCollapsible<CollapsibleData> {
    existingData?: CollapsibleData
    key: Accessor<number>
    onChange(updatedCar?: CollapsibleData): void
    onRemove(): void
}