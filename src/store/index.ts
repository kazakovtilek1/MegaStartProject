import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import { toursApi } from "./api/ToursApi";
import { guidesApi } from "./api/GuidesApi";
import { reviewsApi } from "./api/ReviewsApi";
import modalReducer from "@/src/store/slices/ModalSlice";
import authReducer from "@/src/store/slices/AuthSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    modal: modalReducer,
    auth: authReducer,
    [toursApi.reducerPath]: toursApi.reducer,
    [guidesApi.reducerPath]: guidesApi.reducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(toursApi.middleware)
      .concat(guidesApi.middleware)
      .concat(reviewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
