"use client";

import { tours, Tour } from "@/constants/tours";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useState, useEffect } from "react";

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

  return (
    <div className="flex justify-center gap-5 flex-wrap">
      {tours.map((tour: Tour) => {
        const isFavorite = favorites.includes(tour.id);

        return (
          <div key={tour.id} className="w-77 h-auto">
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
              <h2 className="font-semibold text-lg">{tour.title}</h2>
              <p className="flex items-center gap-[3px] text-base font-medium">
                {tour.rating}
                <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
              </p>
            </div>
            <p className="font-medium text-base">Цена: {tour.price} сом</p>
            <p className="font-medium text-base">
              Даты выездов: {tour.departureDate.join(", ")}
            </p>
            <p className="font-medium text-base">
              Осталось мест: {tour.placesLeft}
            </p>
          </div>
        );
      })}
    </div>
  );
}
