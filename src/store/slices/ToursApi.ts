import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tour } from "@/constants/Tours";

export const toursApi = createApi({
  reducerPath: "toursApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://680b-158-181-132-208.ngrok-free.app/v1/api",
  }),
  endpoints: (builder) => ({
    getTours: builder.query<Tour[], void>({
      query: () => "/tours",
    }),
  }),
});

export const { useGetToursQuery } = toursApi;
