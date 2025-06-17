"use client";

import Navbar from "@/components/home/navbar/Navbar";
import { LiaStarSolid } from "react-icons/lia";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetTourByIdQuery } from "@/src/store/slices/ToursApi";
import DatePickerComponent from "@/components/DatePicker/DatePickerComponent";
import LeaveReview from "@/components/leaveReview/LeaveReview";
import Reviews from "@/components/reviews/Reviews";
import Footer from "@/components/footer/Footer";
import TourInfo from "@/components/tourInfo/TourInfo";

export default function TourPage() {
  const { id } = useParams() as { id: string };
  const tourId = Number(id);
  const { data: tour, isLoading, error } = useGetTourByIdQuery(tourId);
  const [startDate, setStartDate] = useState<Date | null>(null);

  if (isLoading) return <p className="text-center m-10 text-xl">Загрузка...</p>;
  if (error || !tour)
    return <p className="text-center text-xl text-red-500">Тур не найден</p>;

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div
            className="flex justify-center bg-cover bg-center bg-no-repeat bg-fixed w-full h-screen rounded-[20px] p-[3px]"
            style={{ backgroundImage: `url(${tour.image})` }}
          >
            <Navbar />
          </div>
        </div>
        <div className="my-16 flex gap-21 items-center font-semibold text-[32px]">
          <h2>Тур на {tour.title}</h2>
          <p className="flex items-center gap-1.5 text-2xl font-semibold mt-[7px]">
            {tour.rating}
            <LiaStarSolid className="w-8 h-8 text-[#E48C3F]" />
          </p>
        </div>
        <div className="flex">
          <div className="font-medium text-xl">
            <p className="mb-10">Ближайшие даты выездов</p>
            <button className="w-77 h-12 bg-[#2CA261] text-white rounded-[10px] cursor-pointer hover:bg-[#40D885] transition-colors duration-250 ease-in-out">
              Забронировать
            </button>
          </div>
          <DatePickerComponent
            startDate={startDate}
            setStartDate={setStartDate}
          />
        </div>
        <div className="flex flex-col gap-4 mt-16">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <TourInfo />
      </div>
      <div>
        <LeaveReview />
      </div>
      <div className="container mx-auto">
        <Reviews />
        <Footer />
      </div>
    </div>
  );
}
