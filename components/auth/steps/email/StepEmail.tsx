"use client";

import { useStep } from "../../StepContext";
import { useForm } from "react-hook-form";
import {
  IoIosArrowBack,
  IoIosClose,
  IoIosEye,
  IoIosEyeOff,
} from "react-icons/io";
import { useState } from "react";
import {
  LoginBtnClass,
  LoginBtnClassNext,
  CloseBtnClass,
  BackBtnClass,
} from "@/app/styles/auth/authBtnStyles";

type EmailFormData = {
  email: string;
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

  const onSubmit = (data: EmailFormData) => {
    next();
    //отправить на API
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
      <h2 className="text-[32px] font-medium text-center mb-7">
        Вход через почту
      </h2>
      <div className="w-full flex flex-col gap-3.5">
        <input
          {...register("email", {
            required: "Введите Email",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Некорректный Email",
            },
          })}
          type="email"
          placeholder="Введите почту или логин *"
          className="p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium"
        />
        {errors.email && (
          <span className="text-red-500 text-sm ml-0.5">
            {errors.email.message}
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
            className="w-full p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium"
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
          className="font-medium text-start text-base cursor-pointer text-[#18A0FB] hover:underline"
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
