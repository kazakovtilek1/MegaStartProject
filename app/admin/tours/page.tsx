"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import AdminTourCard from "@/components/admin/tours/AdminTourCard";
import AdminToursFilter from "@/components/admin/adminTourFilter/AdminTourFilter";
import { FilterType } from "@/constants/AdminTourTypes";
import { filterTours } from "@/utilities/filterTours";
import { useGetToursQuery } from "@/src/store/api/ToursApi";

const FILTERS: FilterType[] = [
  "all",
  "active",
  "archived",
  "popular",
  "unpopular",
];

export default function AdminToursPage() {
  const { data: allTours = [], error, isLoading } = useGetToursQuery();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryFilter = searchParams.get("filter") as FilterType | null;

  const [currentFilter, setCurrentFilter] = useState<FilterType>(
    FILTERS.includes(queryFilter as FilterType)
      ? (queryFilter as FilterType)
      : "all",
  );

  useEffect(() => {
    if (queryFilter && FILTERS.includes(queryFilter as FilterType)) {
      setCurrentFilter(queryFilter as FilterType);
    } else if (!queryFilter) {
      setCurrentFilter("all");
    }
  }, [queryFilter]);

  const filteredTours = useMemo(() => {
    return filterTours(allTours, currentFilter);
  }, [allTours, currentFilter]);

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === "all") {
      router.push("/admin/tours");
    } else {
      router.push(`/admin/tours?filter=${newFilter}`);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h3 className="font-semibold text-2xl underline mt-14 mb-9">Туры</h3>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Фильтры */}
        <AdminToursFilter
          currentFilter={currentFilter}
          onFilterChange={handleFilterChange}
          filtersToShow={FILTERS}
        />

        {/* Контент */}
        <div>
          {isLoading ? (
            <p className="text-lg">Загрузка туров...</p>
          ) : error ? (
            <p className="text-lg text-red-500">Ошибка загрузки туров.</p>
          ) : (
            <>
              <p className="text-lg font-medium mb-4 ml-2">
                Количество: {filteredTours.length}
              </p>
              <div className="flex flex-wrap gap-5">
                {filteredTours.map((tour) => (
                  <AdminTourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
