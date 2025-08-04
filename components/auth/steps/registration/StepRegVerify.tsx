"use clinet";

import { IoIosArrowBack, IoIosClose } from "react-icons/io";
import { useStep } from "../../StepContext";
import { useForm } from "react-hook-form";
import { CloseBtnClass, BackBtnClass } from "@/app/styles/auth/authBtnStyles";
import { AuthInputClass } from "@/app/styles/auth/authInputStyles";
import axios from "axios";

type RegVerify = {
  verifyCode: string;
};

export default function StepRegVerify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegVerify>();
  const { back, close } = useStep();

  return (
    <form>
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
      <h2 className="text-[32px] font-medium text-center mb-14">Регистрация</h2>
    </form>
  );
}
