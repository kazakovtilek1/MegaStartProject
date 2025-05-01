"use client";

import { inputClass, inputCommentClass } from "@/app/styles/ContactFormStyles";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log("Форма отправлена", data);
    } catch (error) {
      console.error("Ошибка отправки формы", error);
    }
  };

  return (
    <ErrorBoundary fallback={<div>Ошибка отправки формы</div>}>
      <div className="flex justify-center gap-28 w-350 h-125 bg-[#27B567] mt-25">
        <div className="text-center mt-51">
          <h3
            className="font-semibold text-[32px] text-white mb-4"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Необходимо связаться с Вами?
          </h3>
          <p
            className="font-semibold text-xl text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Оставьте свои контакты
          </p>
        </div>
        <div className="w-158 h-90 border border-dashed border-[#9747FF] rounded-[5px] p-5 mt-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-between"
          >
            {/* Имя */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder={
                  errors.name ? errors.name.message : "Фамилия и имя *"
                }
                {...register("name", { required: "Введите ваше имя" })}
                className={`${inputClass} ${
                  errors.name ? "placeholder-red-400" : ""
                }`}
              />
            </div>

            {/* Телефон */}
            <div className="flex flex-col">
              <input
                type="tel"
                placeholder={errors.phone ? errors.phone.message : "Телефон *"}
                {...register("phone", { required: "Введите номер телефона" })}
                className={`${inputClass} ${
                  errors.phone ? "placeholder-red-400" : ""
                }`}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                placeholder={errors.email ? errors.email.message : "Email *"}
                {...register("email", { required: "Введите email" })}
                className={`${inputClass} ${
                  errors.email ? "placeholder-red-400" : ""
                }`}
              />
            </div>

            {/* Комментарий */}
            <div className="flex flex-col">
              <textarea
                placeholder="Комментарий"
                {...register("comment")}
                className={inputCommentClass}
              />
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{ fontFamily: "var(--font-inter)" }}
              className="w-148 h-15 font-medium text-xl bg-[#E48C3F] border-none rounded-[15px] text-white mt-6 cursor-pointer hover:bg-white border hover:border-[#E48C3F] hover:text-black transform transition-all duration-250 ease-in-out"
            >
              {isSubmitting ? "Отправка..." : "Отправить Заявку"}
            </button>
          </form>
        </div>
      </div>
    </ErrorBoundary>
  );
}
