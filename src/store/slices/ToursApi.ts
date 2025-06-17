import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tour } from "@/constants/Tours";

export const toursApi = createApi({
  reducerPath: "toursApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTours: builder.query<Tour[], void>({
      query: () => "/tours",
    }),
    getTourById: builder.query<Tour, number>({
      query: (id) => `/tours/${id}`,
    }),
  }),
});

export const { useGetToursQuery, useGetTourByIdQuery } = toursApi;
