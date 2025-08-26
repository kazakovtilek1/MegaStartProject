// src/utils/auth.ts
import Cookies from "js-cookie";
import { AppDispatch } from "@/src/store";
import { clearUser } from "@/src/store/slices/AuthSlice";
import { closeLoginModal } from "@/src/store/slices/ModalSlice";

// Сохранение токенов
export const saveTokens = (accessToken: string, refreshToken: string) => {
  Cookies.set("accessToken", accessToken, {
    expires: 7,
    secure: true,
    sameSite: "lax",
  });
  Cookies.set("refreshToken", refreshToken, {
    expires: 30,
    secure: true,
    sameSite: "lax",
  });
};

// Удаление токенов и очистка состояния
export const logout = (dispatch: AppDispatch) => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  dispatch(clearUser());
  dispatch(closeLoginModal());
};

// Получение токенов
export const getAccessToken = () => Cookies.get("accessToken");
export const getRefreshToken = () => Cookies.get("refreshToken");
