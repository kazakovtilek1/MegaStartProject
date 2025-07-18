import { StatisticsFilterType } from "@/constants/AdminStatisticsTypes";

interface AdminStatisticsFilterProps {
  currentFilter: StatisticsFilterType;
  onFilterChange: (filter: StatisticsFilterType) => void;
}

export default function AdminStatisticsFilter({
  currentFilter,
  onFilterChange,
}: AdminStatisticsFilterProps) {
  const filters = [
    { key: "all", label: "Все туры" },
    { key: "popular", label: "Самые популярные" },
    { key: "unpopular", label: "Менее популярные" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onFilterChange(key as StatisticsFilterType)}
          className={`cursor-pointer text-start transition-all duration-300 ease-in-out whitespace-nowrap ${
            currentFilter === key
              ? "font-semibold text-xl"
              : "font-normal text-base"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
