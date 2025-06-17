"use client";

import { useForm } from "react-hook-form";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { useStep } from "../../StepContext";
import {
  LoginBtnClass,
  CloseBtnClass,
  BackBtnClass,
} from "@/app/styles/auth/authBtnStyles";

type TelegramFormData = {
  TelegramNumber: number;
};

export default function LoginWithTelegram() {
  const { next, back, close } = useStep();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TelegramFormData>();

  const onSubmit = (data: TelegramFormData) => {
    next();
    console.log("Отправка кода на Telegram:", data.TelegramNumber);
    // отправка на API
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
      <h2 className="text-[32px] font-medium text-center mb-18">Вход</h2>
      <input
        {...register("TelegramNumber", {
          required: "Введите Telegram номер",
          pattern: {
            value: /^@?[\w\d_]{1,}$/,
            message: "Некорректный номер",
          },
        })}
        type="text"
        placeholder="Номер телефона Telegram *"
        className="w-full p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium"
      />
      {errors.TelegramNumber && (
        <span className="text-red-500 text-sm ml-0.5">
          {errors.TelegramNumber.message}
        </span>
      )}
      <div className="w-full flex justify-center items-center gap-5 my-11">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          className="w-full p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium"
          placeholder="Код"
        />
        <p className="w-32 rounded-[10px] p-2.5 shadow-inner text-base font-medium">
          OTP-код
        </p>
      </div>
      <button className="text-base font-medium cursor-pointer self-start">
        Отправить код повторно
      </button>
      <button type="submit" className={`${LoginBtnClass} mb-5 mt-16`}>
        Войти
      </button>
    </form>
  );
}
