"use client";

import { useStep } from "../../StepContext";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import debounce from "lodash.debounce";
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
    setError,
    clearErrors,
    watch,
  } = useForm<RegistrationFormData>();

  const { next, back, close } = useStep();
  const [showPassword, setShowPassword] = useState(false);

  const usernameValue = watch("username");
  const passwordValue = watch("password");

  const isPasswordStrong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(
      passwordValue || "",
    );

  // Проверка логина с debounce
  const debouncedCheckUsernameRef = useRef(
    debounce(async (username: string) => {
      if (!username || username.length < 4) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/exists/${username}`,
        );

        if (res.data.available) {
          setError("username", {
            type: "manual",
            message: "Данный логин уже используется",
          });
        } else {
          clearErrors("username");
        }
      } catch {
        setError("username", {
          type: "manual",
          message: "Ошибка при проверке логина",
        });
      }
    }, 500),
  );

  useEffect(() => {
    const debouncedFn = debouncedCheckUsernameRef.current;
    debouncedFn(usernameValue);
    return () => {
      debouncedFn.cancel();
    };
  }, [usernameValue]);

  const onSubmit = (data: RegistrationFormData) => {
    if (errors.username) {
      alert("Данный логин занят");
      return;
    }
    next("regVerify");
    console.log("Submit", data);
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
                required: "Придумайте пароль",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Пароль должен содержать минимум 8 символов, включая заглавную и строчную букву, цифру и символ",
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
          {passwordValue && (
            <span
              className={`text-sm ml-0.5 ${
                isPasswordStrong ? "text-yellow-500" : "text-red-600"
              }`}
            >
              {isPasswordStrong ? "Надёжный пароль" : "Пароль ненадёжный"}
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
