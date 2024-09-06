import { IDefaultApiExclude } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";
import { IUser } from "types/Users";

interface props3 extends IDefaultApiExclude<"filters" | "pagination"> { }
export const useUserQuery = (data: props3) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IUser[], any>({
    data: [],
    api: "/public/users/list",
    key: "useUserQuery",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};