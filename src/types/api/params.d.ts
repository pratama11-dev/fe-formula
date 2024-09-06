export interface IPagination {
  current: number;
  pageSize: number;
  total: number;
}

export interface IDefaultApi {
  session?: Sessions;
  enabled?: boolean;
  pagination?: IPagination;
  filters?: any;
  search?: string | undefined;
}

export type IDefaultApiExclude<K extends keyof T> = Omit<IDefaultApi, K>;
export type IDefaultApiOnly<K extends keyof T> = Pick<IDefaultApi, K>;
