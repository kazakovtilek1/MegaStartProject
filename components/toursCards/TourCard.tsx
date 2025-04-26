import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { getDayLabel } from "../../utilities/pluralize";
import { Tour } from "@/constants/Tours";
import React from "react";

type TourCardProps = {
  tour: Tour;
  isFavorite: boolean;
  toggleFavorite: (id: number) => void;
};

export default React.memo(function TourCard({
  tour,
  isFavorite,
  toggleFavorite,
}: TourCardProps) {
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
      <p className="font-medium text-base">Осталось мест: {tour.placesLeft}</p>
    </div>
  );
});
