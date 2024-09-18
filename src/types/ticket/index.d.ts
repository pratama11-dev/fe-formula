import { IOrderItem } from "../event"

export interface ITicket {
    id?: string
    id_order_item?: string
    qr_code?: string
    is_active?: string
    price?: string
    order_item?: IOrderItem
}