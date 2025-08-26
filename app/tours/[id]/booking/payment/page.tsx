"use client";

import {
  bookingFormBtnClass,
  inputClass,
} from "@/app/styles/bookingForm/BookingFormStyles";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetTourByIdQuery } from "@/src/store/api/ToursApi";

export default function PaymentPage() {
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [promoCode, setPromoCode] = useState("");
  const { id } = useParams() as { id: string };
  const { data: tour } = useGetTourByIdQuery(Number(id));

  const participants = Number(searchParams.get("participants")) || 1;
  useEffect(() => {
    if (tour?.price) {
      setTotalPrice(tour.price * participants);
    }
  }, [tour?.price, participants]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Введён промокод:", promoCode);
  };

  const handleClose = () => {
    router.push(`/tours/${id}`);
  };

  return (
    <div className="container mx-auto relative flex flex-col items-center p-12 gap-3.5">
      <h2 className="font-semibold text-xl">II. Оплата тура</h2>
      <GrClose
        onClick={handleClose}
        className="absolute right-50 cursor-pointer hover:scale-110 transition-all duration-200"
      />
      <img
        src={`http://34.18.76.114/v1/api/qr/mbank?amount=${totalPrice}`}
        alt="QR для Mbank оплаты"
        width={256}
        height={256}
      />
      <p>Отсканируйте QR-код в банковском приложении</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3.5 items-center"
      >
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          placeholder="Введите промокод"
          className={`${inputClass} text-center`}
        />
        <p>Итого к оплате: {totalPrice} сом</p>
        <button className={bookingFormBtnClass}>Забронировать</button>
      </form>
    </div>
  );
}
