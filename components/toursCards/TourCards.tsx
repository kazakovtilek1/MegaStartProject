"use client";

import { Tour } from "@/constants/Tours";
import {
  useGetToursQuery,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} from "@/src/store/api/ToursApi";
import { useState, useEffect, useCallback, useMemo } from "react";
import TourCard from "./TourCard";
import { IoIosArrowForward } from "react-icons/io";
import { TbBrandWechat } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { openLoginModal } from "@/src/store/slices/ModalSlice";
import { useDispatch } from "react-redux";
import {
  allToursButtonClass,
  bestToursButtonClass,
  buttonBoxClass,
  oneDayToursButtonClass,
} from "@/app/styles/tourCards/TourCardsStyles";

type FilterType = "tours" | "bestTours";

type ToursCardsProps = {
  isFullPage?: boolean;
  filteredTours?: Tour[];
};

export default function ToursCards({
  isFullPage = false,
  filteredTours,
}: ToursCardsProps) {
  const [selected, setSelected] = useState<FilterType>("tours");
  const [chatReady, setChatReady] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: allTours, isLoading, error } = useGetToursQuery();
  const { data: favoriteTours, refetch: refetchFavorites } =
    useGetFavoritesQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const favoriteIds = useMemo(() => {
    return favoriteTours ? favoriteTours.map((tour) => tour.id) : [];
  }, [favoriteTours]);
  const tours = filteredTours ?? allTours;
  const router = useRouter();

  const toggleFavorite = useCallback(
    async (id: number) => {
      if (!user) {
        dispatch(openLoginModal());
        return;
      }

      const isAlreadyFavorite = favoriteIds.includes(id);
      try {
        if (isAlreadyFavorite) {
          await removeFavorite(id).unwrap();
        } else {
          await addFavorite(id).unwrap();
        }
        await refetchFavorites();
      } catch (error) {
        console.error("Ошибка избранного запроса:", error);
        alert("Не удалось обновить избранное. Попробуйте позже.");
      }
    },
    [
      favoriteIds,
      addFavorite,
      removeFavorite,
      user,
      dispatch,
      refetchFavorites,
    ],
  );

  const handleClick = useCallback((button: FilterType) => {
    setSelected(button);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.vectorshift.ai/chatWidget.js";
    script.async = true;
    script.id = "vectorshift-chat-widget";
    script.setAttribute("chatbot-id", "68852c79ee88d3091622c571");
    script.setAttribute("chatbot-height", "600px");
    script.setAttribute("chatbot-width", "400px");

    script.onload = () => {
      const check = setInterval(() => {
        if ((window as any).VectorshiftChat) {
          console.log("VectorshiftChat готов");
          setChatReady(true);
          clearInterval(check);
        }
      }, 500);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Рендер карточек
  const tourCards = useMemo(() => {
    if (!tours) return null;

    let filteredTours = tours;

    if (selected === "bestTours") {
      filteredTours = tours.filter((tour) => tour.rating > 4.5);
    }

    if (!tours || filteredTours.length === 0) return null;

    return filteredTours.map((tour: Tour) => {
      const isFavorite = favoriteIds.includes(tour.id);

      return (
        <TourCard
          key={tour.id}
          tour={tour}
          isFavorite={isFavorite}
          toggleFavorite={() => toggleFavorite(tour.id)}
        />
      );
    });
  }, [tours, toggleFavorite, selected, favoriteIds]);

  // Загрузка или ошибка
  if (isLoading)
    return <p className="text-center m-10 text-xl">Загрузка туров...</p>;
  if (error)
    return (
      <p className="text-center text-red-500 m-10 text-3xl">
        Ошибка при загрузке туров...
      </p>
    );

  return (
    <div className="container mx-auto relative w-241">
      {!isFullPage && (
        <div className="flex justify-center">
          <div className={buttonBoxClass}>
            <button
              onClick={() => handleClick("tours")}
              className={`${bestToursButtonClass} ${
                selected === "tours"
                  ? "bg-[#40D885]/75 text-white"
                  : "bg-transparent text-black"
              }`}
            >
              Туры
            </button>
            <button
              onClick={() => handleClick("bestTours")}
              className={`${oneDayToursButtonClass} ${
                selected === "bestTours"
                  ? "bg-[#40D885]/75 text-white"
                  : "bg-transparent text-black"
              }`}
            >
              Лучшие туры
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-5 flex-wrap">
        {tourCards ?? (
          <p className="text-center w-full text-xl my-10">
            К сожалению, подходящих туров не найдено.
          </p>
        )}
      </div>

      {!isFullPage && (
        <div className="flex justify-center">
          <button
            onClick={() => router.push("/tours")}
            className={allToursButtonClass}
          >
            Смотреть все туры <IoIosArrowForward />
          </button>
        </div>
      )}
      <TbBrandWechat
        className="absolute -bottom-10 -right-10 w-30 h-30 cursor-pointer hover:scale-110 transition-transform duration-300"
        strokeWidth={0.5}
      />
    </div>
  );
}
