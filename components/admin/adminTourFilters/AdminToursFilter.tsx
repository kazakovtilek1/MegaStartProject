import { FilterType } from "@/constants/AdminTourTypes";

interface AdminTourFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function AdminTourFilters({
  currentFilter,
  onFilterChange,
}: AdminTourFiltersProps) {
  const filters = [
    { key: "all", label: "Все туры" },
    { key: "active", label: "Активные" },
    { key: "archived", label: "В архиве" },
    { key: "popular", label: "Популярные" },
    { key: "lowDemand", label: "Не пользуются спросом" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          onClick={() => onFilterChange(key as FilterType)}
          className={`cursor-pointer text-start transition-all duration-300 ease-in-out whitespace-nowrap ${
            currentFilter === key
              ? "font-semibold text-lg"
              : "font-normal text-base"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
