import { FilterType, FILTER_LABELS } from "@/constants/AdminTourTypes";

interface AdminTourFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filtersToShow: FilterType[];
}

export default function AdminTourFilter({
  currentFilter,
  onFilterChange,
  filtersToShow,
}: AdminTourFilterProps) {
  return (
    <div className="flex flex-col gap-6">
      {filtersToShow.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)}
          className={`cursor-pointer text-start transition-all duration-300 ease-in-out whitespace-nowrap ${
            currentFilter === filter
              ? "font-semibold text-lg"
              : "font-normal text-base"
          }`}
        >
          {FILTER_LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
