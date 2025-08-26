"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import { useStep } from "../../StepContext";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { closeLoginModal } from "@/src/store/slices/ModalSlice";
import { saveTokens } from "@/utilities/auth";
import { setUser } from "@/src/store/slices/AuthSlice";
import {
  CountryCode,
  parsePhoneNumberFromString,
  AsYouType,
} from "libphonenumber-js";
import {
  LoginBtnClass,
  CloseBtnClass,
  BackBtnClass,
} from "@/app/styles/auth/authBtnStyles";
import { AuthInputClass } from "@/app/styles/auth/authInputStyles";

type PhoneFormData = {
  phone: string;
  otp: string;
};

const countryCodes = [
  { code: "KG", dialCode: "+996" },
  { code: "KZ", dialCode: "+7" },
  { code: "UZ", dialCode: "+998" },
  { code: "AZ", dialCode: "+994" },
  { code: "BY", dialCode: "+375" },
  { code: "US", dialCode: "+1" },
];

export default function LoginWithTelegram() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useFormContext<PhoneFormData>();
  const dispatch = useDispatch();
  const { back, close } = useStep();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("KG");

  const dialCode =
    countryCodes.find((c) => c.code === selectedCountry)?.dialCode || "";

  const validatePhone = (val: string) => {
    const fullNumber = dialCode + val.replace(/\D/g, "");
    const parsed = parsePhoneNumberFromString(fullNumber, selectedCountry);
    return parsed?.isValid() || "Неверный номер";
  };

  const onSubmit = async (data: PhoneFormData) => {
    const fullNumber = dialCode + data.phone.replace(/\D/g, "");

    try {
      const response = await axios.post(
        "http://34.18.76.114/v1/api/otp/confirm",
        {
          phoneNumber: fullNumber,
          otp: data.otp,
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

      const user = profileResponse.data;
      dispatch(setUser(user));
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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const full = (dialCode + input).replace(/\s+/g, "");

    const formatted = new AsYouType().input(full);
    const localPart = formatted.replace(dialCode, "").trim();

    setValue("phone", localPart);
  };

  const onGetCodeClick = async () => {
    const valid = await trigger("phone");
    if (valid) {
      window.open("https://t.me/my_otp_login_bot", "_blank");
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
      <h2 className="text-[32px] font-medium text-center mb-18">Вход</h2>
      <div className="flex justify-center gap-3.5">
        <select
          className="p-2.5 shadow-inner rounded-[10px]"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value as CountryCode)}
        >
          {countryCodes.map((country) => (
            <option key={country.code} value={country.code}>
              {country.dialCode}
            </option>
          ))}
        </select>

        <input
          type="tel"
          inputMode="tel"
          placeholder="Введите номер"
          {...register("phone", {
            required: "Введите номер",
            validate: validatePhone,
          })}
          onChange={handleInput}
          className={`${AuthInputClass} w-full`}
        />
      </div>

      {errors.phone && (
        <p className="text-red-500 text-sm ml-1">{errors.phone.message}</p>
      )}
      <div className="w-auto flex justify-center items-center gap-5 mt-11">
        <input
          type="text"
          inputMode="numeric"
          maxLength={4}
          className={`${AuthInputClass} w-full`}
          placeholder="Введите OTP-код *"
          {...register("otp", {
            required: "Введите OTP-код",
            pattern: {
              value: /^\d{4}$/,
              message: "OTP-код должен содержать ровно 4 цифры",
            },
          })}
        />
        <button
          type="button"
          onClick={onGetCodeClick}
          className="w-59 rounded-[10px] p-2.5 shadow-inner text-base text-center font-medium cursor-pointer hover:bg-gray-100 transition-all duration-200"
        >
          Получить код
        </button>
      </div>
      {errors.otp && (
        <p className="text-red-500 text-sm ml-1">{errors.otp.message}</p>
      )}
      <button type="submit" className={`${LoginBtnClass} mb-5 mt-16`}>
        Войти
      </button>
    </form>
  );
}
