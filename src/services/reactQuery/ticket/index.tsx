import { IDefaultApi } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { IOrders, ITicket } from "types/ticket/index";

export const useTicketQuery = (data: IDefaultApi) => {
    const { enabled } = data;

    return useQueryHooks(data).config<ITicket[], any>({
        data: ["pagination", "search", "filters"],
        api: "/api/ticket",
        key: "useTicketQuery",
        method: "POST",
        config: {
            enabled: enabled ?? true,
            refetchOnWindowFocus: true,
            keepPreviousData: false,
        },
    });
};

export const useOrderQuery = (data: IDefaultApi) => {
    const { enabled } = data;

    return useQueryHooks(data).config<IOrders[], any>({
        data: ["pagination", "search", "filters"],
        api: "/api/order",
        key: "useOrderQuery",
        method: "POST",
        config: {
            enabled: enabled ?? true,
            refetchOnWindowFocus: true,
            keepPreviousData: false,
        },
    });
};