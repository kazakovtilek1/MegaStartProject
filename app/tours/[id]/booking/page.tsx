"use client";

import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import type { Booking } from "@/constants/BookingTour";
import { useRouter, useParams } from "next/navigation";
import {
  bookingFormBtnClass,
  inputBoxClass,
  inputClass,
  labelClass,
} from "@/app/styles/bookingForm/BookingFormStyles";

export default function BookingForm() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Booking>();

  const onSubmit = (data: Booking) => {
    console.log("Данные формы:", data);
    const participants = data.participantsCount;
    router.push(`/tours/${id}/booking/payment?participants=${participants}`);
  };

  const handleClose = () => {
    router.push(`/tours/${id}`);
  };

  return (
    <div className="container mx-auto relative flex flex-col items-center p-12 gap-6">
      <h2 className="font-semibold text-xl">I. Регистрация на тур</h2>
      <GrClose
        onClick={handleClose}
        className="absolute right-50 cursor-pointer hover:scale-110 transition-all duration-200"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-3/4">
        <div className="flex gap-5">
          <div className="w-full flex flex-col gap-6">
            <div className={inputBoxClass}>
              <label className={labelClass}>ФИО *</label>
              <input
                type="text"
                placeholder="Введите ФИО"
                className={inputClass}
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm ml-1">Укажите ФИО</p>
              )}
            </div>
            <div className={inputBoxClass}>
              <label className={labelClass}>Номер телефона *</label>
              <input
                type="text"
                placeholder="Введите номер телефона"
                className={inputClass}
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm ml-1">
                  Укажите номер телефона
                </p>
              )}
            </div>
            <div className={inputBoxClass}>
              <label className={labelClass}>Страна проживания *</label>
              <input
                type="text"
                placeholder="Введите страну проживания"
                className={inputClass}
                {...register("country", { required: true })}
              />
              {errors.country && (
                <p className="text-red-500 text-sm ml-1">
                  Укажите страну проживания
                </p>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col gap-6">
            <div className={inputBoxClass}>
              <label className={labelClass}>Электронная почта *</label>
              <input
                type="email"
                placeholder="Электронная почта"
                className={inputClass}
                {...register("email", {
                  required: "Укажите электронную почту",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Некорректный Email",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className={inputBoxClass}>
              <label className={labelClass}>Количество участников *</label>
              <input
                type="number"
                placeholder="Укажите количество участников тура"
                className={inputClass}
                {...register("participantsCount", {
                  required: "Укажите количество участников",
                  min: { value: 1, message: "Минимум 1 участник" },
                })}
              />
              {errors.participantsCount && (
                <p className="text-red-500 text-sm ml-1">
                  {errors.participantsCount.message}
                </p>
              )}
            </div>
            <div className="flex gap-2 mt-10">
              <label className="font-semibold text-base ">
                Есть ли несовершеннолетние участники? *
              </label>
              <label className="font-normal text-sm">
                <input
                  className="w-6 h-6"
                  type="radio"
                  value="yes"
                  {...register("hasMinors", { required: true })}
                />
                Да
              </label>
              <label className="font-normal text-sm">
                <input
                  className="w-6 h-6"
                  type="radio"
                  value="no"
                  {...register("hasMinors", { required: true })}
                />
                Нет
              </label>
              {errors.hasMinors && (
                <p className="text-red-500 text-sm ml-1">
                  Укажите наличие несовершеннолетних
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-center mt-6">
          <p className="font-semibold text-base">Верно заполните все данные.</p>
          <p className="font-semibold text-base">
            Наши менеджеры свяжутся с Вами и подтвердят вашу бронь на тур.
          </p>
          <button type="submit" className={bookingFormBtnClass}>
            Перейти к оплате
          </button>
        </div>
      </form>
    </div>
  );
}
