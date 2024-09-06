import { IDefaultApi } from "types/api/params";
import {
  IWorkcenterReport,
  IWorkcenterResponse,
} from "types/report/workcenter";
import useQueryHooks from "../customHooks/useQueryHooks";

interface params extends IDefaultApi {
  workcenter: string;
  search: string;
}

const useWorkcenterQuery = (data: params) => {
  const { enabled } = data;

  return useQueryHooks(data).config<IWorkcenterReport[], IWorkcenterResponse>({
    data: ["pagination", "workcenter", "search"],
    api: "/api/report/workcenter-list",
    key: "useIborGreige",
    method: "POST",
    config: {
      enabled: enabled ?? true,
      refetchOnWindowFocus: true,
      keepPreviousData: false,
    },
  });
};

export default useWorkcenterQuery;
