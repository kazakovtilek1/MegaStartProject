import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import { toursApi } from "./api/ToursApi";
import { guidesApi } from "./api/GuidesApi";
import { reviewsApi } from "./api/ReviewsApi";
import modalReducer from "@/src/store/slices/ModalSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    [toursApi.reducerPath]: toursApi.reducer,
    [guidesApi.reducerPath]: guidesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(toursApi.middleware)
      .concat(guidesApi.middleware)
      .concat(reviewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
