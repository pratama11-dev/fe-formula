import { IDefaultApi } from "types/api/params";
import useQueryHooks from "../customHooks/useQueryHooks";

interface hello {
  x: "hello";
}

export const useIborGreigeQuery = async (data: IDefaultApi) => {
  const { enabled } = data;

  const response = useQueryHooks(data).config<hello, any>({
    data: ["session", "pagination", "filters", "search", "enabled"],
    api: "/api/delivery",
    key: "useIborGreige",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    },
  });

  return response;
};

export default useIborGreigeQuery;
