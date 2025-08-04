"use client";

import { useState, useMemo } from "react";
import { FilterType } from "@/constants/AdminTourTypes";
import AdminToursFilter from "@/components/admin/adminTourFilter/AdminTourFilter";
import { Tour } from "@/constants/AdminTours";
import { filterTours } from "@/utilities/filterTours";
import Image from "next/image";
import Link from "next/link";
import { useGetToursQuery } from "@/src/store/api/ToursApi";
import { getDayLabel } from "@/utilities/pluralize";
import { LiaStarSolid } from "react-icons/lia";
import {
  tourCardRatingClass,
  tourCardTitleClass,
  tourCardPriceDeparturePlacesClass,
} from "@/app/styles/tourCards/TourCardStyles";

const STATISTICS_FILTERS: FilterType[] = ["all", "mostpopular", "lowDemand"];

export default function StatisticsPage() {
  const { data: tours, error, isLoading } = useGetToursQuery();
  const [currentFilter, setCurrentFilter] = useState<FilterType>("all");

  const handleFilterChange = (newFilter: FilterType) => {
    setCurrentFilter(newFilter);
  };

  const filteredTours: Tour[] = useMemo(() => {
    return filterTours(tours ?? [], currentFilter);
  }, [tours, currentFilter]);

  if (isLoading) {
    return <div className="text-center m-10 text-xl">Загрузка туров...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 m-10 text-3xl">
        Ошибка загрузки туров.
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h3 className="font-semibold text-2xl underline mt-14 mb-9">
        Статистика
      </h3>
      <div className="flex mt-21 gap-35">
        <div>
          <AdminToursFilter
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter}
            filtersToShow={STATISTICS_FILTERS}
          />
        </div>
        <div className="flex flex-col gap-14">
          {filteredTours.length > 0 ? (
            filteredTours.map((tour) => (
              <div key={tour.id} className="flex gap-6">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  width={308}
                  height={308}
                  className="rounded-[15px]"
                />
                <div className="flex flex-col w-[295px] gap-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-full flex justify-between">
                      <Link href={`/admin/tours/${tour.id}`}>
                        <h2 className={tourCardTitleClass}>{tour.title}</h2>
                      </Link>
                      <div className="flex items-center gap-0.5">
                        <p className={tourCardRatingClass}>{tour.rating}</p>
                        <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
                      </div>
                    </div>
                    <p className={tourCardPriceDeparturePlacesClass}>
                      {tour.tourDuration} {getDayLabel(tour.tourDuration)}
                    </p>
                    <p className={tourCardPriceDeparturePlacesClass}>
                      {tour.price} сом
                    </p>
                    <p className={tourCardPriceDeparturePlacesClass}>
                      Даты выездов: {tour.departureDates.join(", ")}
                    </p>
                    <p className={tourCardPriceDeparturePlacesClass}>
                      Осталось мест: {tour.placesLeft}
                    </p>
                    <p className={tourCardPriceDeparturePlacesClass}>
                      Автор тура: {tour.author}
                    </p>
                  </div>
                  <p className={tourCardPriceDeparturePlacesClass}>
                    Посещений: {tour.visits}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Туры не найдены.</p>
          )}
        </div>
      </div>
    </div>
  );
}
