import { CiLocationOn } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { PiCalendarDotsThin } from "react-icons/pi";
import { BsPersonRaisedHand } from "react-icons/bs";
import { MdOutlineHiking } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { useGetTourByIdQuery } from "@/src/store/api/ToursApi";
import { useParams } from "next/navigation";
import { Tour } from "@/constants/Tours";
import {
  getDayLabel,
  getYearLabel2,
  getGroupLabel,
} from "@/utilities/pluralize";

export default function TourInfo() {
  const { id } = useParams() as { id: string };
  const tourId = Number(id);
  const { data: tour, error, isLoading } = useGetTourByIdQuery(tourId);

  if (isLoading) return <p className="text-center my-16">Загрузка...</p>;
  if (error || !tour)
    return <p className="text-center text-red-500">Ошибка загрузки данных.</p>;

  const getDifficultyLabel = (difficulty: Tour["difficulty"]) => {
    switch (difficulty) {
      case "EASY":
        return "Лёгкий";
      case "MEDIUM":
        return "Средний";
      case "HARD":
        return "Сложный";
      default:
        return "Не определена";
    }
  };

  return (
    <div>
      <p className="my-16 font-normal text-base">{tour.description}</p>
      <div className="flex gap-25 justify-center my-16">
        <div className="flex flex-col gap-9">
          <div className="flex gap-4 items-center">
            <CiLocationOn className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Точка сбора:</h4>
              <p className="font-medium text-base">{tour.meetingPoint}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <GoCreditCard className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Стоимость:</h4>
              <p className="font-medium text-base">{tour.price} сом</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex gap-4 items-center">
            <PiCalendarDotsThin className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Длительность:</h4>
              <p className="font-medium text-base">
                {tour.tourDuration} {getDayLabel(tour.tourDuration)}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <BsPersonRaisedHand className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Допустимый возраст</h4>
              <p className="font-medium text-base">
                от {tour.minAge} {getYearLabel2(tour.minAge)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="flex gap-4 items-center">
            <MdOutlineHiking className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Сложность:</h4>
              <p className="font-medium text-base">
                {getDifficultyLabel(tour.difficulty)}
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <FaPeopleGroup className="w-20 h-20" />
            <div className="flex flex-col gap-3">
              <h4 className="font-medium text-xl">Группа</h4>
              <p className="font-medium text-base">
                от {tour.groupSize} {getGroupLabel(tour.groupSize)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
