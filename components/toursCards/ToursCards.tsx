"use client";

import { tours, Tour } from "@/constants/Tours";
import { useState, useEffect, useCallback, useMemo } from "react";
import TourCard from "./TourCard";
import { IoIosArrowForward } from "react-icons/io";

type FilterType = "best" | "oneDay";

export default function ToursCards() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<FilterType>("best");

  // Загрузка избранного
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Сохранение избранного
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }, []);

  const handleClick = useCallback((button: FilterType) => {
    setSelected(button);
  }, []);

  // Рендер карточек
  const tourCards = useMemo(() => {
    return tours.map((tour: Tour) => {
      const isFavorite = favorites.includes(tour.id);

      return (
        <TourCard
          key={tour.id}
          tour={tour}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      );
    });
  }, [favorites, toggleFavorite]);

  return (
    <div className="relative w-241">
      <div className="flex justify-center">
        <div className="flex justify-center w-114 my-11 rounded-[20px] border border-[#3DD0C9] border-solid shadow-inner">
          <button
            onClick={() => handleClick("best")}
            className={`w-57 h-20 rounded-l-[20px] text-base font-semibold flex justify-center items-center cursor-pointer transition duration-300 hover:shadow-lg ${
              selected === "best"
                ? "bg-[#40D885]/75 text-white"
                : "bg-transparent text-black"
            }`}
          >
            Лучшие туры
          </button>
          <button
            onClick={() => handleClick("oneDay")}
            className={`w-57 h-20 rounded-r-[20px] text-base font-semibold flex justify-center items-center cursor-pointer transition duration-300 hover:shadow-lg ${
              selected === "oneDay"
                ? "bg-[#40D885]/75 text-white"
                : "bg-transparent text-black"
            }`}
          >
            Однодневные туры
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-5 flex-wrap">{tourCards}</div>

      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2.5 w-114 h-12 bg-[#E48C3F] text-white text-base font-medium rounded-[15px] cursor-pointer hover:bg-[#E48C3F]/90 transform transition-transform hover:scale-105 duration-300">
          Смотреть все туры <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
}
