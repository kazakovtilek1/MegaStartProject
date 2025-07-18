import { Tour } from "@/constants/AdminTours";
import React from "react";
import Image from "next/image";
import { getDayLabel } from "@/utilities/pluralize";
import { LiaStarSolid } from "react-icons/lia";
import Link from "next/link";

type AdminTourCardProps = {
  tour: Tour;
};

export default function AdminTourCard({ tour }: AdminTourCardProps) {
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
      </div>
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-[5px]">
          <Link href={`/admin/tours/${tour.id}`}>
            <h2 className="font-semibold text-lg mt-[7px] hover:scale-103 transition-all duration-200 cursor-pointer">
              {tour.title}
            </h2>
          </Link>
          <p className="font-medium text-base">
            {tour.tourDuration} {getDayLabel(tour.tourDuration)}
          </p>
          <p className="font-medium text-base">Цена: {tour.price} сом</p>
          <p className="font-medium text-base">
            Даты выездов: {tour.departureDates.join(", ")}
          </p>
          <p className="font-medium text-base">
            Осталось мест: {tour.placesLeft}
          </p>
          <p className="font-medium text-base">Автор: {tour.author}</p>
        </div>
        <div className="flex items-center gap-[3px] text-base font-medium mt-[7px]">
          {tour.rating}
          <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
        </div>
      </div>
    </div>
  );
}
