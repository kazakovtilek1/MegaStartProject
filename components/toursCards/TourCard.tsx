import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { getDayLabel } from "../../utilities/pluralize";
import { Tour } from "@/constants/Tours";
import React from "react";
import Link from "next/link";
import {
  tourCardDurationClass,
  tourCardPriceDeparturePlacesClass,
  tourCardRatingClass,
  tourCardTitleClass,
} from "@/app/styles/TourCardStyles";

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
      <div className="relative group">
        <Image
          src={tour.image}
          alt={tour.title}
          width={308}
          height={308}
          className="rounded-[15px]"
        />
        <Link
          href={`/tours/${tour.id}`}
          className="absolute bottom-0 left-0 w-77 h-14 bg-[#FFFFFFCC] font-semibold text-base text-black flex justify-center items-center rounded-b-[15px] opacity-0 group-hover:opacity-80 transition-opacity duration-300"
        >
          Забронировать
        </Link>
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
      <div className="flex flex-col gap-[5px]">
        <div className="flex justify-between">
          <Link href={`/tours/${tour.id}`}>
            <h2 className={tourCardTitleClass}>{tour.title}</h2>
          </Link>
          <p className={tourCardRatingClass}>
            {tour.rating}
            <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
          </p>
        </div>
        <p className={tourCardDurationClass}>
          {tour.tourDuration} {getDayLabel(tour.tourDuration)}
        </p>
        <p className={tourCardPriceDeparturePlacesClass}>{tour.price} сом</p>
        <p className={tourCardPriceDeparturePlacesClass}>
          Даты выездов: {tour.departureDates.join(", ")}
        </p>
        <p className={tourCardPriceDeparturePlacesClass}>
          Осталось мест: {tour.placesLeft}
        </p>
      </div>
    </div>
  );
});
