import API_ENDPOINT from "@api/apiEndpoint";
import { showError } from "@utils/helpers/AntdHelper";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { Sessions } from "types/Session";

interface IAxiosResponse extends AxiosResponse<any, any> {
  code?: -1 | 0;
  info?: any;
}

export interface IFetcherGetParams {
  url: string;
  api: "SSO" | "API" | "CUSTOM";
}

export interface IFetcherPostParams extends IFetcherGetParams {
  data: any;
}

const initialRes = {
  data: null,
  status: 0,
  statusText: "",
  headers: {},
  config: {},
};

const useFetcher = (sessions?: Sessions) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState<any | undefined>("");

  async function FetcherPost({
    url,
    api,
    data,
  }: IFetcherPostParams): Promise<IAxiosResponse> {
    let endpoint = "NOENDPOINT";
    switch (api) {
      case "SSO":
        endpoint = API_ENDPOINT.SSO ?? "NOENDPOINT";
        break;
      case "API":
        endpoint = API_ENDPOINT.API ?? "NOENDPOINT";
        break;
      case "CUSTOM":
        endpoint = "";
        break;
      default:
        endpoint = "NOENDPOINT";
        break;
    }

    const fixUrl = endpoint + url;

    setError(undefined);
    setLoading(true);

    try {
      const response = await axios.post(fixUrl, data, {
        headers: {
          Authorization: `Bearer ${sessions?.token || ""}`,
        },
      });

      return response;
    } catch (error: any) {
      const info = error?.response?.data?.message
        ?? error?.response?.data?.info
        ?? "Terjadi Kesalahan pada server!";

      showError("Error!", info);
      setError(info);
      return {
        ...initialRes,
        code: -1,
        info,
      };
    } finally {
      setLoading(false);
    }
  }

  async function FetcherGet({
    url,
    api,
  }: IFetcherGetParams): Promise<IAxiosResponse> {
    setError(undefined);
    setLoading(true);
    let endpoint = "NOENDPOINT";
    switch (api) {
      case "SSO":
        endpoint = API_ENDPOINT.SSO ?? "NOENDPOINT";
        break;
      case "API":
        endpoint = API_ENDPOINT.API ?? "NOENDPOINT";
        break;
      case "CUSTOM":
        endpoint = "";
        break;
      default:
        endpoint = "NOENDPOINT";
        break;
    }
    const fixUrl = endpoint + url;

    try {
      const response = await axios.get(fixUrl, {
        headers: {
          Authorization: `Bearer ${sessions?.token || ""}`,
        },
      });

      return response;
    } catch (error: any) {
      const info = error?.response?.data?.message
        ?? error?.response?.data?.info
        ?? "Terjadi Kesalahan pada server!";

      showError("Error!", info);
      setError(info);
      return {
        ...initialRes,
        code: -1,
        info,
      };
    } finally {
      setLoading(false);
    }
  }

  return { FetcherGet, FetcherPost, isLoading, isError };
};

export default useFetcher;
