import { IDefaultApi, IDefaultApiExclude } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { ICalendar } from "types/Calendar";

interface props3 extends IDefaultApiExclude<"filters" | "pagination"> { 
  users?: string[]
  search?: string
}
export const useCalendarQuery = (data: props3) => {
  const { enabled } = data;

  return useQueryHooks(data).config<ICalendar[], any>({
    data: ["users", "search"],
    api: "/public/event/list",
    key: "useCalendarQuery",
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
    api: `/public/event/detail/${data?.id}`,
    key: "useDetailEventQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};

