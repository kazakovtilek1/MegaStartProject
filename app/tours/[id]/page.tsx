"use client";

import Navbar from "@/components/home/navbar/Navbar";
import { LiaStarSolid } from "react-icons/lia";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetTourByIdQuery } from "@/src/store/api/ToursApi";
import DatePickerComponent from "@/components/datePicker/DatePickerComponent";
import LeaveReview from "@/components/leaveReview/LeaveReview";
import Reviews from "@/components/reviews/Reviews";
import Footer from "@/components/footer/Footer";
import TourInfo from "@/components/tourInfo/TourInfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { openLoginModal } from "@/src/store/slices/ModalSlice";

export default function TourPage() {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const { id } = useParams() as { id: string };
  const tourId = Number(id);
  const { data: tour, isLoading, error } = useGetTourByIdQuery(tourId);
  const [startDate, setStartDate] = useState<Date | null>(null);

  if (isLoading) return <p className="text-center m-10 text-xl">Загрузка...</p>;
  if (error || !tour)
    return <p className="text-center text-xl text-red-500">Тур не найден.</p>;

  const handleBookingClick = () => {
    if (user) {
      router.push(`/tours/${tour.id}/booking`);
    } else {
      dispatch(openLoginModal());
    }
  };

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
          <h2>{tour.title}</h2>
          <p className="flex items-center gap-1.5 text-2xl font-semibold mt-[7px]">
            {tour.rating}
            <LiaStarSolid className="w-8 h-8 text-[#E48C3F]" />
          </p>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-6">
            <p className="font-medium text-xl">Ближайшие даты выездов:</p>
            <p className="font-normal text-lg">
              {tour.departureDates.join(", ")}
            </p>
            <button
              onClick={handleBookingClick}
              className="w-77 h-12 bg-[#2CA261] text-white rounded-[10px] cursor-pointer hover:bg-[#40D885] transition-colors duration-250 ease-in-out"
            >
              Забронировать
            </button>
          </div>
          <DatePickerComponent
            startDate={startDate}
            setStartDate={setStartDate}
          />
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
