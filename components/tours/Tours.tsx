import Link from "next/link";

export default function Tours() {
  return (
    <div>
      <div className="flex justify-center w-114 my-11 rounded-[20px] border border-[#3DD0C9] border-solid shadow-inner">
        <Link
          href="/theBestTours"
          className="w-57 h-20 bg-[#40D885]/75 rounded-l-[20px] text-white text-base font-semibold flex justify-center items-center"
        >
          Лучшие туры
        </Link>
        <Link
          href="/oneDayTours"
          className="w-57 h-20 rounded-r-[20px] flex justify-center text-base font-semibold items-center"
        >
          Однодневные туры
        </Link>
      </div>
    </div>
  );
}
