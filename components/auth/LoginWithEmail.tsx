"use client";

import { useForm } from "react-hook-form";

type EmailFormData = {
  email: string;
  password: string;
};

export default function LoginWithEmail({ onBack }: { onBack: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>();

  const onSubmit = (data: EmailFormData) => {
    console.log("Вход:", data.email);
    //отправить на API
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <h2 className="text-[32px] font-medium text-center mb-18">Вход</h2>

      <input
        {...register("email", {
          required: "Введите Email",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "Некорректный Email",
          },
        })}
        type="email"
        placeholder="Введите почту *"
        className="w-full p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium"
      />
      {errors.email && (
        <span className="text-red-500 text-sm ml-0.5">
          {errors.email.message}
        </span>
      )}

      <input
        {...register("password", {
          required: "Введите пароль",
          minLength: {
            value: 6,
            message: "Минимум 6 символов",
          },
        })}
        type="password"
        placeholder="Пароль"
        className="w-full p-2.5 bg-[#F7F8FA] shadow-inner rounded-[10px] focus:outline-none text-base font-medium mt-11"
      />
      {errors.password && (
        <span className="text-red-500 text-sm ml-0.5">
          {errors.password.message}
        </span>
      )}

      <button
        type="submit"
        className="w-full bg-[#3DD0C9] p-[10px] rounded-[10px] font-medium text-xl cursor-pointer hover:bg-[#e5e5e7] mt-11"
      >
        Вход
      </button>

      <button
        type="button"
        onClick={onBack}
        className="text-sm hover:underline cursor-pointer self-start mt-5"
      >
        Назад
      </button>
    </form>
  );
}
