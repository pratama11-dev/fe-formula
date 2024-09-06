import { IDefaultApiExclude } from "types/api/params";
import { IBufferstock } from "types/report/bufferstock";
import useQueryHooks from "../customHooks/useQueryHooks";

const useBufferstockQuery = (
  data: IDefaultApiExclude<"search" | "filters" | "pagination">
) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IBufferstock[], any>({
    data: [],
    api: "/api/report/buffer-list",
    key: "useBufferstock",
    method: "GET",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};

export default useBufferstockQuery;
