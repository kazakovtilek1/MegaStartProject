interface LeaveReviewProps {
  showButton?: boolean;
}

export default function LeaveReview({ showButton = true }: LeaveReviewProps) {
  return (
    <div className="flex justify-between mb-11 items-center w-full h-38 rounded-[20px] border border-[#00000040]/25 shadow-lg ">
      <h2 className="font-semibold text-4xl ml-19">Отзывы</h2>
      {showButton && (
        <button className="w-71 h-12 mr-21 bg-[#E48C3F] rounded-[15px] text-white font-medium text-2xl cursor-pointer hover:bg-white hover:text-black border hover:border-[#E48C3F] transform transition-transform hover:scale-105 duration-300">
          Оставить свой отзыв
        </button>
      )}
    </div>
  );
}
