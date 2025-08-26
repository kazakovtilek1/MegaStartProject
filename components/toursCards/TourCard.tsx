import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { getDayLabel } from "../../utilities/pluralize";
import { Tour } from "@/constants/Tours";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store";
import { openLoginModal } from "@/src/store/slices/ModalSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  tourCardDurationClass,
  tourCardPriceDeparturePlacesClass,
  tourCardRatingClass,
  tourCardTitleClass,
} from "@/app/styles/tourCards/TourCardStyles";

type TourCardProps = {
  tour: Tour;
  isFavorite: boolean;
  toggleFavorite: () => void;
  disabled?: boolean;
};

export default React.memo(function TourCard({
  tour,
  isFavorite,
  toggleFavorite,
  disabled,
}: TourCardProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleBookngClick = () => {
    if (user) {
      router.push(`/tours/${tour.id}/booking`);
    } else {
      dispatch(openLoginModal());
    }
  };

  return (
    <div className="w-77 h-auto mb-11">
      <div className="relative group">
        <Image
          src={tour.image}
          alt={tour.title}
          width={308}
          height={308}
          className="rounded-[15px] w-full h-auto object-cover"
        />
        <button
          onClick={handleBookngClick}
          className="absolute bottom-0 left-0 w-full h-14 cursor-pointer bg-[#FFFFFFCC] font-semibold text-base text-black flex justify-center items-center rounded-b-[15px] opacity-0 group-hover:opacity-80 transition-opacity duration-300"
        >
          Забронировать
        </button>
        <div
          onClick={() => !disabled && toggleFavorite()}
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
          Даты выездов:{" "}
          {tour.departureDates.length > 0
            ? tour.departureDates.join(", ")
            : "Нет доступных дат"}
        </p>
        <p className={tourCardPriceDeparturePlacesClass}>
          Осталось мест: {tour.placesLeft}
        </p>
      </div>
    </div>
  );
});
