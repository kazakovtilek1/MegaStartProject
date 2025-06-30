"use client";

import { useStep } from "../../StepContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoIosArrowBack,
  IoIosClose,
  IoIosEye,
  IoIosEyeOff,
} from "react-icons/io";
import {
  LoginBtnClassNext,
  CloseBtnClass,
  BackBtnClass,
} from "@/app/styles/auth/authBtnStyles";
import { AuthInputClass } from "@/app/styles/auth/authInputStyles";

type RegistrationFormData = {
  email: string;
  username: string;
  password: string;
};

export default function Registration() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>();

  const { next, back, close } = useStep();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegistrationFormData) => {
    next();
    // отправка на API
  };

  return (
    <div>
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
        <h2 className="text-[32px] font-medium text-center mb-14">
          Регистрация
        </h2>
        <div className="w-full flex flex-col gap-3.5">
          <input
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Некорректный Email",
              },
            })}
            type="email"
            placeholder="Введите почту *"
            className={AuthInputClass}
          />
          {errors.email && (
            <span className="text-red-500 text-sm ml-0.5">
              {errors.email.message}
            </span>
          )}
          <input
            {...register("username", {
              required: "Введите логин",
              minLength: {
                value: 4,
                message: "Логин должен содержать минимум 4 символа",
              },
              maxLength: {
                value: 20,
                message: "Логин не должен превышать 20 символов",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Логин может содержать только буквы, цифры и _",
              },
            })}
            type="text"
            placeholder="Введите логин *"
            className={AuthInputClass}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
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
              placeholder="Придумайте пароль *"
              className={`${AuthInputClass} w-full`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer"
              aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showPassword ? (
                <IoIosEye size={30} />
              ) : (
                <IoIosEyeOff size={30} />
              )}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm ml-0.5">
              {errors.password.message}
            </span>
          )}
        </div>
        <p className="font-medium text-sm mt-2.5 p-1">
          Пароль должен быть не менее 8 символов, включать буквы в верхнем и
          нижнем регистре, содержать цифры и другие знаки
        </p>
        <button type="submit" className={`${LoginBtnClassNext} mt-14`}>
          Далее
        </button>
      </form>
    </div>
  );
}
