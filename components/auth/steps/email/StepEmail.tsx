"use client";

import { useStep } from "../../StepContext";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "@/src/store/slices/ModalSlice";
import { setUser } from "@/src/store/slices/AuthSlice";
import {
  IoIosArrowBack,
  IoIosClose,
  IoIosEye,
  IoIosEyeOff,
} from "react-icons/io";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  LoginBtnClass,
  LoginBtnClassNext,
  CloseBtnClass,
  BackBtnClass,
} from "@/app/styles/auth/authBtnStyles";
import { AuthInputClass } from "@/app/styles/auth/authInputStyles";
import { saveTokens } from "@/utilities/auth";

type EmailFormData = {
  identifier: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginWithEmail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>();

  const { next, back, close } = useStep();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data: EmailFormData) => {
    try {
      const response = await axios.post(
        "http://34.18.76.114/v1/api/sign-in",
        {
          identifier: data.identifier,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );

      const { accessToken, refreshToken } = response.data;
      saveTokens(accessToken, refreshToken);

      // Получаем профиль текущего пользователя
      const profileResponse = await axios.get(
        "http://34.18.76.114/v1/api/profiles/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      dispatch(setUser(profileResponse.data));
      dispatch(closeLoginModal());
    } catch (error) {
      const err = error as AxiosError<{ message?: string }>;
      console.error(
        "Ошибка при подтверждении OTP:",
        err.response?.data || err.message,
      );
      alert(err.response?.data?.message || "Ошибка входа. Проверьте код.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <button
        type="button"
        onClick={close}
        aria-label="Закрыть"
        className={CloseBtnClass}
      >
        <IoIosClose />
      </button>

      <button
        type="button"
        onClick={back}
        aria-label="Назад"
        className={BackBtnClass}
      >
        <IoIosArrowBack />
      </button>
      <h2 className="text-[32px] font-medium text-center mb-7">Вход</h2>
      <div className="w-full flex flex-col gap-3.5">
        <input
          {...register("identifier", {
            required: "Введите Email",
            // pattern: {
            //   value: /^\S+@\S+\.\S+$/,
            //   message: "Некорректный Email",
            // },
          })}
          type="text"
          placeholder="Введите почту или логин *"
          className={AuthInputClass}
        />
        {errors.identifier && (
          <span className="text-red-500 text-sm ml-0.5">
            {errors.identifier.message}
          </span>
        )}

        <div className="relative">
          <input
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 6,
                message: "Минимум 6 символов",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Пароль"
            className={`${AuthInputClass} w-full`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <IoIosEye size={30} /> : <IoIosEyeOff size={30} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm ml-0.5">
            {errors.password.message}
          </span>
        )}

        <label className="flex items-center gap-2 font-medium text-base cursor-pointer">
          <input
            type="checkbox"
            {...register("rememberMe")}
            className="cursor-pointer"
          />
          Запомнить меня
        </label>

        <button
          type="button"
          className="w-fit font-medium text-base cursor-pointer text-[#18A0FB] hover:underline"
          onClick={() => alert("Функция восстановления ещё не реализована")}
        >
          Забыли пароль?
        </button>
      </div>

      <div className="flex gap-3 mt-17">
        <button type="submit" className={LoginBtnClass}>
          Войти
        </button>

        <button
          type="button"
          onClick={() => next("registration")}
          className={LoginBtnClassNext}
        >
          Регистрация
        </button>
      </div>
    </form>
  );
}
