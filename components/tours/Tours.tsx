import Link from "next/link";

export default function Tours() {
  return (
    <div className="flex justify-center my-11">
      <Link
        href="/theBestTours"
        className="w-57 h-20 bg-[#40D885]/75 rounded-l-[20px] text-white text-base font-semibold flex justify-center items-center border border-[#3DD0C9] border-solid"
      >
        Лучшие туры
      </Link>
      <Link
        href="/oneDayTours"
        className="w-57 h-20 rounded-r-[20px] flex justify-center text-base font-semibold items-center border border-[#3DD0C9] border-solid"
      >
        Однодневные туры
      </Link>
    </div>
  );
}
