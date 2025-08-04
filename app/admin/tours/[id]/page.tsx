"use client";

import AdminToursFilter from "@/components/admin/adminTourFilter/AdminTourFilter";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { FilterType } from "@/constants/AdminTourTypes";
import { LiaStarSolid } from "react-icons/lia";
import Image from "next/image";
import { parse, format } from "date-fns";
import { ru } from "date-fns/locale";
import {
  adminDetailPageBtnClass,
  adminDetailPageEditBtnClass,
  adminModalClass,
  adminModalYesBtnClass,
  adminModalNoBtnClass,
} from "@/app/styles/admin/adminTourDetailPage/AdminTourDetailPageStyles";
import DatePickerComponent from "@/components/datePicker/DatePickerComponent";
import TourInfo from "@/components/tourInfo/TourInfo";
import LeaveReview from "@/components/leaveReview/LeaveReview";
import Reviews from "@/components/reviews/Reviews";
import { useGetTourByIdQuery } from "@/src/store/api/ToursApi";

const FILTERS: FilterType[] = [
  "all",
  "active",
  "archived",
  "popular",
  "lowDemand",
];

export default function AdminTourPage() {
  const { id } = useParams() as { id: string };
  const tourId = Number(id);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [activeModal, setActiveModal] = useState<"delete" | "archive" | null>(
    null,
  );

  const { data: tour, error, isLoading } = useGetTourByIdQuery(tourId);
  const queryFilter = searchParams.get("filter") as FilterType | null;
  const currentFilter = queryFilter || "all";
  const closeModal = () => setActiveModal(null);

  const handleFilterChange = (newFilter: FilterType) => {
    if (newFilter === "all") {
      router.push("/admin/tours");
    } else {
      router.push(`/admin/tours?filter=${newFilter}`);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center m-10 text-xl">Загрузка данных тура...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 m-10 text-3xl">
        Ошибка загрузки тура.
      </div>
    );
  }

  if (!tour) {
    return <div className="text-center m-10 text-xl">Тур не найден</div>;
  }

  return (
    <div>
      <div className="container mx-auto">
        <h3 className="font-semibold text-2xl underline mt-14 mb-9">Туры</h3>
        <div className="flex justify-between">
          <AdminToursFilter
            onFilterChange={handleFilterChange}
            currentFilter={currentFilter}
            filtersToShow={FILTERS}
          />
          <div>
            <div className="flex gap-14 mb-2.5 justify-end">
              <button
                onClick={() => setActiveModal("archive")}
                className={adminDetailPageBtnClass}
              >
                Архивировать тур
              </button>
              <button
                onClick={() => setActiveModal("delete")}
                className={adminDetailPageBtnClass}
              >
                Удалить тур
              </button>
              <button className={adminDetailPageEditBtnClass}>
                <Image
                  src="/images/EditTourIcon.svg"
                  alt="Редактировать"
                  width={24}
                  height={24}
                />
              </button>

              {/* Модальные окна */}

              {activeModal === "delete" && (
                <div className={adminModalClass}>
                  <h4 className="font-semibold text-base">
                    Удалить тур навсегда?
                  </h4>
                  <p className="font-normal text-base mt-9 mb-2.5">Внимание!</p>
                  <p className="font-normal text-base">
                    Удаление тура является необратимым <br /> действием.
                  </p>
                  <div className="flex justify-between mt-11">
                    <button className={adminModalYesBtnClass}>ДА</button>
                    <button
                      onClick={closeModal}
                      className={adminModalNoBtnClass}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              )}

              {activeModal === "archive" && (
                <div className={adminModalClass}>
                  <h4 className="font-semibold text-base">
                    Отправить тур в архив?
                  </h4>
                  <p className="font-normal text-base mt-9 mb-2.5">
                    Ваш тур отправится в раздел <br /> “В архиве”.
                  </p>
                  <p className="font-normal text-base">
                    Вы всегда сможете вернуть тур <br /> обратно.
                  </p>
                  <div className="flex justify-between mt-11">
                    <button className={adminModalYesBtnClass}>ДА</button>
                    <button
                      onClick={closeModal}
                      className={adminModalNoBtnClass}
                    >
                      Нет
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Image
              src={tour.image}
              alt={tour.title}
              width={962}
              height={600}
              className="rounded-[20px] border border-black"
            />
            <div className="flex gap-23 mt-4 ml-2 text-xl font-semibold">
              <div className="flex flex-col gap-3.5">
                <p>{tour.title}</p>
                <p>Автор тура</p>
                <p>Статус тура</p>
              </div>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-1.5">
                  {tour.rating}
                  <LiaStarSolid className="w-8 h-8 text-[#E48C3F]" />
                </p>
                <p>{tour.author ?? "Автор не указан"}</p>
                <p>{tour.placesLeft > 0 ? "Активный" : "Архивированный"}</p>
              </div>
            </div>
            <div className="flex gap-40 mt-22">
              <div className="flex flex-col gap-1.5 font-medium text-xl">
                <h4>Ближайшие даты выездов:</h4>

                {tour.departureDates.map((rawDate, i) => {
                  const parsedDate = parse(rawDate, "yyyy-MM-dd", new Date());

                  if (isNaN(parsedDate.getTime())) {
                    return <p key={i}>Неверная дата</p>;
                  }

                  const formatted = format(parsedDate, "d MMMM", {
                    locale: ru,
                  });

                  return <p key={i}>{formatted}</p>;
                })}
              </div>
              <DatePickerComponent
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
          </div>
        </div>
        <TourInfo />
      </div>
      <div>
        <LeaveReview showButton={false} />
      </div>
      <div className="container mx-auto">
        <Reviews />
      </div>
    </div>
  );
}
