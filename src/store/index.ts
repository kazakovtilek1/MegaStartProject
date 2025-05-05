import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/languageSlice";
import { toursApi } from "./slices/ToursApi";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    [toursApi.reducerPath]: toursApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(toursApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
