import { createApi } from "@reduxjs/toolkit/query/react";
import { Tour, FilterRequest } from "@/constants/Tours";
import { axiosBaseQuery } from "./baseQueryWithReauth";

export const toursApi = createApi({
  reducerPath: "toursApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getTours: builder.query<Tour[], void>({
      query: () => ({
        url: "/tours",
        method: "GET",
      }),
    }),
    getTourById: builder.query<Tour, number>({
      query: (id) => ({
        url: `/tours/${id}`,
        method: "GET",
      }),
    }),
    getFilteredTours: builder.query<Tour[], Partial<FilterRequest>>({
      query: (body) => ({
        url: "/tours/filter",
        method: "POST",
        data: body,
      }),
    }),
    getIndividualTours: builder.query<Tour[], void>({
      query: () => ({
        url: "/tours/individual",
        method: "GET",
      }),
    }),
    addFavorite: builder.mutation<void, number>({
      query: (tourId) => ({
        url: `/favorite-tours/${tourId}`,
        method: "POST",
        data: { tourId },
      }),
    }),
    removeFavorite: builder.mutation<void, number>({
      query: (tourId) => ({
        url: `/favorite-tours/${tourId}`,
        method: "DELETE",
      }),
    }),
    getFavorites: builder.query<Tour[], void>({
      query: () => ({
        url: "/favorite-tours",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetToursQuery,
  useGetTourByIdQuery,
  useGetFilteredToursQuery,
  useGetIndividualToursQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesQuery,
} = toursApi;
