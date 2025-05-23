"use client";

import { useForm } from "react-hook-form";

type TelegramFormData = {
  TelegramNumber: number;
};

export default function LoginWithTelegram({ onBack }: { onBack: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TelegramFormData>();

  const onSubmit = (data: TelegramFormData) => {
    console.log("Отправка кода на Telegram:", data.TelegramNumber);
    // отправка на API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
      <button
        type="submit"
        className="w-full bg-[#3DD0C9] p-[10px] rounded-[10px] font-medium text-xl cursor-pointer hover:bg-[#e5e5e7] mb-5 mt-16"
      >
        Вход
      </button>
      <button
        type="button"
        onClick={onBack}
        className="text-sm hover:underline cursor-pointer self-start"
      >
        Назад
      </button>
    </form>
  );
}
