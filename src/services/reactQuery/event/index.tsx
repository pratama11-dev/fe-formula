import { IDefaultApi, IDefaultApiExclude } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { ICalendar } from "types/Calendar";
import { IEvent } from "types/event/index";

export const useEventQuery = (data: IDefaultApi) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IEvent[], any>({
    data: ["pagination", "search", "filters"],
    api: "/api/event",
    key: "useEventQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};

interface props4 extends IDefaultApi { 
  id?: number,
}

export const useDetailEventQuery = (data: props4) => {
  const { enabled } = data;

  return useQueryHooks(data).config<ICalendar, any>({
    data: ["users"],
    api: `/api/event/detail/${data?.id}`,
    key: "useDetailEventQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};

