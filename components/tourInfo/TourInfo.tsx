import { CiLocationOn } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { PiCalendarDotsThin } from "react-icons/pi";
import { BsPersonRaisedHand } from "react-icons/bs";
import { MdOutlineHiking } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

export default function TourInfo() {
  return (
    <div className="flex gap-25 justify-center my-16">
      <div className="flex flex-col gap-9">
        <div className="flex gap-4 items-center">
          <CiLocationOn className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Точка сбора:</h4>
            <p className="font-medium text-base">Адрес</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <GoCreditCard className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Стоимость:</h4>
            <p className="font-medium text-base">1500 сом</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex gap-4 items-center">
          <PiCalendarDotsThin className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Длительность:</h4>
            <p className="font-medium text-base">1 День</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <BsPersonRaisedHand className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Допустимый возраст</h4>
            <p className="font-medium text-base">от 12 лет</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9">
        <div className="flex gap-4 items-center">
          <MdOutlineHiking className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Сложность:</h4>
            <p className="font-medium text-base">Легкий</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <FaPeopleGroup className="w-20 h-20" />
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-xl">Группа</h4>
            <p className="font-medium text-base">от 5 человек</p>
          </div>
        </div>
      </div>
    </div>
  );
}
