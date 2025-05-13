"use client";

import { Tour } from "@/constants/Tours";
// import { useGetToursQuery } from "@/src/store/slices/ToursApi";
import { tours } from "@/constants/Tours";
import { useState, useEffect, useCallback, useMemo } from "react";
import TourCard from "./TourCard";
import { IoIosArrowForward } from "react-icons/io";
import { TbBrandWechat } from "react-icons/tb";
import { useRouter } from "next/navigation";
import {
  allToursButtonClass,
  bestToursButtonClass,
  buttonBoxClass,
  oneDayToursButtonClass,
} from "@/app/styles/ToursCardsStyles";

type FilterType = "best" | "oneDay";

type ToursCardsProps = {
  isFullPage?: boolean;
};

export default function ToursCards({ isFullPage = false }: ToursCardsProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<FilterType>("best");

  // const { data: tours, isLoading, error } = useGetToursQuery();

  const router = useRouter();

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
    if (!tours) return null;

    let filteredTours = tours;

    if (selected === "oneDay") {
      filteredTours = tours.filter((tour) => tour.tourDuration === 1);
    }

    return filteredTours.map((tour: Tour) => {
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
  }, [tours, favorites, toggleFavorite, selected]);

  // Загрузка или ошибка
  // if (isLoading)
  //   return <p className="text-center m-10 text-xl">Загрузка туров...</p>;
  // if (error)
  //   return (
  //     <p className="text-center text-red-500 m-10 text-3xl">
  //       Ошибка при загрузке туров
  //     </p>
  //   );

  return (
    <div className="relative w-241">
      {!isFullPage && (
        <div className="flex justify-center">
          <div className={buttonBoxClass}>
            <button
              onClick={() => handleClick("best")}
              className={`${bestToursButtonClass} ${
                selected === "best"
                  ? "bg-[#40D885]/75 text-white"
                  : "bg-transparent text-black"
              }`}
            >
              Лучшие туры
            </button>
            <button
              onClick={() => handleClick("oneDay")}
              className={`${oneDayToursButtonClass} ${
                selected === "oneDay"
                  ? "bg-[#40D885]/75 text-white"
                  : "bg-transparent text-black"
              }`}
            >
              Однодневные туры
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-center gap-5 flex-wrap">{tourCards}</div>

      {!isFullPage && (
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/tours")}
            className={allToursButtonClass}
          >
            Смотреть все туры <IoIosArrowForward />
          </button>
        </div>
      )}
      <TbBrandWechat
        className="absolute bottom-0 -right-30 w-30 h-30 cursor-pointer hover:scale-110 transition-transform duration-300"
        strokeWidth={0.5}
      />
    </div>
  );
}
