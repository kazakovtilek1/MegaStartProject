"use client";

import { IoIosClose } from "react-icons/io";
import { useEffect, useRef, useCallback } from "react";
import { useStep } from "../StepContext";
import { CloseBtnClass } from "@/app/styles/auth/authBtnStyles";

export default function StepStart() {
  const { close, next } = useStep();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    close();
  }, [close]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      className="flex flex-col relative focus:outline-none"
    >
      <button
        onClick={handleClose}
        aria-label="Закрыть"
        className={CloseBtnClass}
      >
        <IoIosClose />
      </button>

      <h2 className="text-[32px] font-medium text-center">Вход</h2>

      <div className="mt-19 mb-30 flex flex-col gap-3.5">
        <button
          onClick={() => next("phone")}
          className="w-full p-2.5 bg-[#F7F8FA] font-medium text-base shadow-inner cursor-pointer hover:bg-[#e5e5e7] rounded-[10px]"
        >
          Войти через Telegram
        </button>

        <button
          onClick={() => next("email")}
          className="w-full p-2.5 bg-[#F7F8FA] font-medium text-base shadow-inner cursor-pointer hover:bg-[#e5e5e7] rounded-[10px]"
        >
          Войти через почту
        </button>

        <button
          onClick={() => next("registration")}
          className="w-full p-2.5 bg-[#F7F8FA] font-medium text-base shadow-inner cursor-pointer hover:bg-[#e5e5e7] rounded-[10px]"
        >
          Пройти регистрацию
        </button>
      </div>
    </div>
  );
}
