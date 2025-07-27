import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Tour, FilterRequest } from "@/constants/Tours"

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
    getFilteredTours: builder.query<Tour[], Partial<FilterRequest>>({
      query: (body) => ({
        url: "/tours/filter",
        method: "POST",
        body,
      }),
    }),
    getIndividualTours: builder.query<Tour[], void>({
      query: () => "/tours/individual",
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourByIdQuery,
  useGetFilteredToursQuery,
  useGetIndividualToursQuery,
} = toursApi;
