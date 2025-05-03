"use client";

import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { setLanguage } from "@/src/store/slices/languageSlice";
import { useEffect } from "react";

const languages = ["ru", "en", "kg"] as const;

export default function Switcher() {
  const dispatch = useAppDispatch();
  const language = useAppSelector((state) => state.language.language);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang === "ru" || savedLang === "en" || savedLang === "kg") {
      dispatch(setLanguage(savedLang));
    }
  }, [dispatch]);

  const activeIndex = languages.indexOf(language);

  return (
    <div className="relative w-36 h-10 border border-black rounded-full bg-[#EDEDED] flex items-center justify-between px-1 cursor-pointer overflow-hidden">
      {/* Перемещающаяся ручка */}
      <div
        className="absolute top-0 bottom-0 w-1/3 h-full bg-white rounded-full transition-all duration-300"
        style={{ left: `${activeIndex * 33.3333}%` }}
      />

      {/* Языки */}
      {languages.map((lang) => (
        <div
          key={lang}
          onClick={() => dispatch(setLanguage(lang))}
          className={`z-10 w-1/3 text-center font-medium text-sm transition-colors duration-200 ${
            language === lang ? "text-black" : "text-gray-400"
          }`}
        >
          {lang.toUpperCase()}
        </div>
      ))}
    </div>
  );
}
