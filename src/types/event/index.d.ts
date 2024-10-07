import { IOrderItem } from "../order"

export interface IEvent {
    id?: number
    id_status?: number
    name?: string
    event_date?: string
    id_order_item?: number
    create_at?: string
    updated_at?: string
    order_item?: IOrderItem
    event_status: IEventStatus
}

export interface IEventStatus {
    id?: number
    name?: string
}