"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
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
    <div className="container mx-auto px-4 relative">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        spaceBetween={20}
      >
        {reviews.map((review) => {
          const rating =
            typeof review.rating === "number" && !isNaN(review.rating)
              ? Math.floor(Math.min(Math.max(review.rating, 0), 5))
              : 0;

          const filledStars = rating;
          const emptyStars = 5 - filledStars;

          return (
            <SwiperSlide key={review.id}>
              <div className="h-full flex flex-col justify-center items-center p-4">
                <h3 className="text-2xl font-medium mb-2">{review.name}</h3>

                <div className="flex mb-2 justify-center">
                  {[...Array(filledStars)].map((_, i) => (
                    <LiaStarSolid
                      key={`filled-${review.id}-${i}`}
                      className="w-6 h-5 text-[#E48C3F]"
                    />
                  ))}
                  {[...Array(emptyStars)].map((_, i) => (
                    <LiaStarSolid
                      key={`empty-${review.id}-${i}`}
                      className="w-6 h-5 text-gray-300"
                    />
                  ))}
                </div>

                <p className="text-justify text-base font-normal break-words">
                  {review.comment}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <button
        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 text-7xl text-[#E48C3F] cursor-pointer"
        aria-label="Previous"
      >
        ‹
      </button>
      <button
        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 text-7xl text-[#E48C3F] cursor-pointer"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  );
});

export default Reviews;
