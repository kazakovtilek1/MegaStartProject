"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import { useState } from "react";
import {
  useGetFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/src/store/api/ToursApi";
import TourCard from "@/components/toursCards/TourCard";

export default function FavoritesPage() {
  const { data: favorites, isLoading, error, refetch } = useGetFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const handleRemoveFavorite = async (tourId: number) => {
    try {
      setRemovingId(tourId);
      await removeFavorite(tourId).unwrap();
      refetch();
    } catch (err) {
      console.error("Ошибка при удалении из избранного:", err);
      alert("Не удалось удалить тур из избранного");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto flex-grow">
        <Navbar />
        <div className="felx flex-col ml-12">
          <h3 className="font-semibold text-2xl underline mt-13 mb-4">
            Избранное
          </h3>
          {isLoading && <p>Загрузка избранных туров...</p>}
          {error && (
            <p className="text-red-500">Ошибка при загрузке избранного.</p>
          )}
          {!isLoading && favorites && favorites.length === 0 ? (
            <p className="mb-11 font-medium text-base">
              Ваш список избранного пока пуст. Сохраните понравившиеся вам туры
              и запланируйте свой отдых
            </p>
          ) : (
            <p className="mb-11 font-medium text-base">
              Ваши сохраненные туры уже здесь
            </p>
          )}
          <div className="flex gap-5 flex-wrap">
            {favorites &&
              favorites.length > 0 &&
              favorites.map((tour) => (
                <TourCard
                  key={tour.id}
                  tour={tour}
                  isFavorite={true}
                  toggleFavorite={() => handleRemoveFavorite(tour.id)}
                  disabled={removingId === tour.id}
                />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
