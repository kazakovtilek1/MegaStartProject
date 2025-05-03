import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Language = "ru" | "en" | "kg";

interface LanguageState {
  language: Language;
}

const initialState: LanguageState = {
  language: "ru",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("language", action.payload);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
