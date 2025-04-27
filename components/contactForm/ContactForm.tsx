"use client";

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
    <div className="flex justify-center items-center gap-28 w-350 h-125 bg-[#27B567] mt-25">
      <div className="text-center">
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
      <div className="flex ">
        <div className="w-158 h-90 border border-dashed border-[#9747FF] rounded-[5px] p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-between"
          >
            {/* Имя */}
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Фамилия и имя *"
                {...register("name", { required: "Введите ваше имя" })}
                className="p-3 rounded-[15px] bg-white outline-none w-148 h-15"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Телефон */}
            <div className="flex flex-col">
              <input
                type="tel"
                placeholder="Телефон *"
                {...register("phone", { required: "Введите номер телефона" })}
                className="p-3 rounded-[15px] bg-white outline-none w-148 h-15"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <input
                type="email"
                placeholder="Email *"
                {...register("email", { required: "Введите email" })}
                className="p-3 rounded-[15px] bg-white outline-none w-148 h-15"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Комментарий */}
            <div className="flex flex-col">
              <textarea
                placeholder="Комментарий"
                {...register("comment")}
                className="p-3 rounded-[15px] bg-[#DBDADA] outline-none w-148 h-15"
              />
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-148 h-15 bg-[#E48C3F] rounded-[15px] text-white mt-6 cursor-pointer"
            >
              {isSubmitting ? "Отправка..." : "Отправить Заявку"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
