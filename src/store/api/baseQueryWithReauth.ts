import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import api from "@/src/lib/axiosBase";

export type AxiosBaseQueryError = {
  status: number;
  data: unknown;
};

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method = "GET", data, params }) => {
    try {
      const result = await api({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
        method,
        data,
        params,
        withCredentials: true,
      });

      return { data: result.data };
    } catch (error) {
      const err = error as AxiosError;
      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || err.message,
        },
      };
    }
  };
