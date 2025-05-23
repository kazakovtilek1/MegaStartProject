import { LiaStarSolid } from "react-icons/lia";
import { reviews } from "@/constants/Reviews";
import React from "react";

const Reviews = React.memo(function Reviews() {
  return (
    <div className="container mx-auto flex justify-between gap-5">
      {reviews.map((review) => {
        const filledStars = Math.min(review.rating ?? 0, 5);
        const emptyStars = Math.max(5 - filledStars, 0);

        return (
          <div
            key={review.id}
            className="w-77 h-96 flex justify-center flex-col items-center"
          >
            <h3 className="text-2xl font-medium">{review.name}</h3>

            <div className="flex justify-center my-1.5">
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

            <p className="text-justify text-base font-normal p-2.5">{`"${review.text}"`}</p>
          </div>
        );
      })}
    </div>
  );
});

export default Reviews;
