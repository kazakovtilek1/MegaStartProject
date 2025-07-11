import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Guide } from "@/constants/Guides";

export const guidesApi = createApi({
  reducerPath: "guidesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getGuides: builder.query<Guide[], void>({
      query: () => "/guides",
    }),
  }),
});

export const { useGetGuidesQuery } = guidesApi;
