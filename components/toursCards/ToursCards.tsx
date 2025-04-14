"use client";

import { tours, Tour } from "@/constants/tours";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";
import { getDayLabel } from "../../utilities/pluralize";
import { IoIosArrowForward } from "react-icons/io";

export default function ToursCards() {
  const [favorites, setFavorites] = useState<number[]>([]);

  //   Загрузка избранного из localStorage при загрузке
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  //   Сохранение избранного в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //   Добавление / удаление избранного
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const [selected, setSelected] = useState<string>("best");

  const handleClick = (button: string) => {
    setSelected(button);
  };

  return (
    <div className="relative w-241">
      <div className="flex justify-center">
        <div className="flex justify-center w-114 my-11 rounded-[20px] border border-[#3DD0C9] border-solid shadow-inner">
          <button
            onClick={() => handleClick("best")}
            className={`w-57 h-20 rounded-l-[20px] text-base font-semibold flex justify-center items-center cursor-pointer transform transition-transform hover:scale-103 ${
              selected === "best"
                ? "bg-[#40D885]/75 text-white"
                : "bg-transparent text-black "
            }`}
          >
            Лучшие туры
          </button>
          <button
            onClick={() => handleClick("oneDay")}
            className={`w-57 h-20 rounded-r-[20px] text-base font-semibold flex justify-center items-center cursor-pointer duration-200 transform transition-transform hover:scale-103 ${
              selected === "oneDay"
                ? "bg-[#40D885]/75 text-white"
                : "bg-transparent text-[black]"
            }`}
          >
            Однодневные туры
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-5 flex-wrap">
        {tours.map((tour: Tour) => {
          const isFavorite = favorites.includes(tour.id);

          return (
            <div key={tour.id} className="w-77 h-auto mb-11">
              <div className="relative">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={308}
                  height={308}
                  className="rounded-[15px]"
                />
                <div
                  onClick={() => toggleFavorite(tour.id)}
                  className="absolute top-2 left-2 cursor-pointer w-6 h-6"
                >
                  {isFavorite ? (
                    <AiFillHeart className="text-red-500 w-full h-full" />
                  ) : (
                    <AiOutlineHeart className="text-black hover:text-red-500 w-full h-full transition-colors duration-200" />
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg mt-[7px]">{tour.title}</h2>
                <p className="flex items-center gap-[3px] text-base font-medium mt-[7px]">
                  {tour.rating}
                  <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
                </p>
              </div>
              <p className="font-medium text-base my-[5px]">
                {tour.tourDuration} {getDayLabel(tour.tourDuration)}
              </p>
              <p className="font-medium text-base">Цена: {tour.price} сом</p>
              <p className="font-medium text-base my-[5px]">
                Даты выездов: {tour.departureDate.join(", ")}
              </p>
              <p className="font-medium text-base">
                Осталось мест: {tour.placesLeft}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button className="flex justify-center items-center gap-2.5 w-114 h-12 bg-[#E48C3F] text-white text-base font-medium rounded-[15px] cursor-pointer hover:bg-[#E48C3F]/90 transform transition-transform hover:scale-105 duration-300">
          Смотреть все туры <IoIosArrowForward />
        </button>
      </div>
      <Image
        src="/images/supportChat.png"
        alt="Support chat"
        width={100}
        height={100}
        className="absolute -bottom-10 -right-43 cursor-pointer rounded-lg transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
      />
    </div>
  );
}
