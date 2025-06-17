"use client";

import { LiaStarSolid } from "react-icons/lia";
import { useGetReviewsQuery } from "@/src/store/slices/ReviewsApi";
import React from "react";

const Reviews = React.memo(function Reviews() {
  const { data: reviews, isLoading, error } = useGetReviewsQuery();

  if (isLoading) {
    return <div className="text-center my-10 text-xl">Загрузка отзывов...</div>;
  }

  if (error || !reviews) {
    return (
      <div className="text-center text-red-500 my-10">
        Ошибка загрузки отзывов.
      </div>
    );
  }
  return (
    <div className="container mx-auto flex flex-wrap gap-5">
      {reviews.map((review) => {
        const rating =
          typeof review.rating === "number" && !isNaN(review.rating)
            ? Math.floor(Math.min(Math.max(review.rating, 0), 5))
            : 0;

        const filledStars = rating;
        const emptyStars = 5 - filledStars;

        return (
          <div
            key={review.id}
            className="flex w-[23%] justify-center items-center flex-col"
          >
            <h3 className="text-2xl font-medium">{review.name}</h3>

            <div className="flex my-1.5">
              {[...Array(filledStars)].map((_, i) => (
                <LiaStarSolid
                  key={`filled-${i}`}
                  className="w-6 h-5 text-[#E48C3F]"
                />
              ))}
              {[...Array(emptyStars)].map((_, i) => (
                <LiaStarSolid
                  key={`empty-${i}`}
                  className="w-6 h-5 text-gray-300"
                />
              ))}
            </div>

            <p className="w-full text-justify break-words text-base font-normal p-2.5">{`"${review.comment}"`}</p>
          </div>
        );
      })}
    </div>
  );
});

export default Reviews;
