"use client";

import { useFormContext } from "react-hook-form";
import {
  CountryCode,
  parsePhoneNumberFromString,
  AsYouType,
} from "libphonenumber-js";
import { useStep } from "../../StepContext";
import { useState } from "react";
import { IoIosClose, IoIosArrowBack } from "react-icons/io";
import {
  BackBtnClass,
  CloseBtnClass,
  LoginBtnClassNext,
} from "@/app/styles/auth/authBtnStyles";
import { AuthInputClass } from "@/app/styles/auth/authInputStyles";

const countryCodes = [
  { code: "KG", dialCode: "+996" },
  { code: "KZ", dialCode: "+7" },
  { code: "UZ", dialCode: "+998" },
  { code: "AZ", dialCode: "+994" },
  { code: "BY", dialCode: "+375" },
  { code: "US", dialCode: "+1" },
];

type PhoneFormData = {
  phone: string;
};

export default function StepPhone() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PhoneFormData>();

  const { next, back, close } = useStep();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>("KG");

  const dialCode =
    countryCodes.find((c) => c.code === selectedCountry)?.dialCode || "";

  const onSubmit = (data: PhoneFormData) => {
    const fullNumber = dialCode + data.phone.replace(/\D/g, "");
    const phone = parsePhoneNumberFromString(fullNumber, selectedCountry);

    if (phone?.isValid()) {
      console.log("Отправляем OTP на:", phone.number);
      next("otp");
    } else {
      console.error("Неверный номер");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    const full = (dialCode + input).replace(/\s+/g, "");

    const formatted = new AsYouType().input(full);
    const localPart = formatted.replace(dialCode, "").trim();

    setValue("phone", localPart);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

      <h2 className="text-[32px] font-medium text-center">Вход</h2>

      <div className="flex justify-center gap-3.5 mt-18">
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
            validate: (val) => {
              const dialCode =
                countryCodes.find((c) => c.code === selectedCountry)
                  ?.dialCode || "";
              const fullNumber = dialCode + (val || "").replace(/\D/g, "");
              const parsed = parsePhoneNumberFromString(
                fullNumber,
                selectedCountry,
              );
              return parsed?.isValid() || "Неверный номер";
            },
          })}
          onChange={handleInput}
          className={`${AuthInputClass} w-full`}
        />
      </div>

      {errors.phone && (
        <p className="text-red-500 text-sm ml-1">{errors.phone.message}</p>
      )}

      <button type="submit" className={`${LoginBtnClassNext} mt-50`}>
        Далее
      </button>
    </form>
  );
}
