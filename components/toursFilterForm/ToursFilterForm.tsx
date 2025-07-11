import React, { useState } from "react";
import { regions, filterOptions } from "@/constants/ToursFilterList";
import { FilterRequest } from "@/constants/Tours";

type Difficulty = "EASY" | "MEDIUM" | "HARD" | "";
type Props = {
  onApply: (filters: FilterRequest) => void;
};

export default function ToursFilterForm({ onApply }: Props) {
  const [region, setRegion] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD" | "">(
    "",
  );

  const handleCheckboxChange = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setRegion("");
    setDifficulty("");
    setFilters({});
    onApply({});
  };

  const handleApply = () => {
    const filterBody: FilterRequest = {
      oneDay: filters["oneDay"],
      longTerm: filters["longTerm"],
      guideIncluded: filters["guideIncluded"],
      withAccommodation: filters["withAccommodation"],
      withFood: filters["withFood"],
      smallGroup: filters["smallGroup"],
      bigGroup: filters["bigGroup"],
      difficulty: difficulty || undefined,
      region: region || undefined,
    };

    onApply(filterBody);
  };

  const handleDifficultyChange = (value: string) => {
    if (
      value === "EASY" ||
      value === "MEDIUM" ||
      value === "HARD" ||
      value === ""
    ) {
      setDifficulty(value as Difficulty);
    }
  };

  return (
    <aside className="w-65 h-auto mt-36 mr-16 border border-dashed border-[#9747FF] rounded-[5px] p-5">
      <div className="mb-4">
        <select
          className="w-55 h-10 p-2.5 bg-[#F7F8FA] rounded-[10px] text-center font-normal text-sm"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="">Регион</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <select
          className="w-55 h-10 p-2.5 bg-[#F7F8FA] rounded-[10px] text-center font-normal text-sm"
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
        >
          <option value="">Сложность</option>
          <option value="EASY">Легкий</option>
          <option value="MEDIUM">Средний</option>
          <option value="HARD">Сложный</option>
        </select>
      </div>

      <div>
        {filterOptions.map(({ name, key }) => (
          <label
            key={key}
            className="flex w-55 h-10 bg-[#F7F8FA] items-center space-x-[10px] mb-2 rounded-[10px] p-2.5 font-normal text-sm"
          >
            <input
              type="checkbox"
              checked={!!filters[key]}
              onChange={() => handleCheckboxChange(key)}
              className="form-checkbox w-6 h-6"
            />
            <span>{name}</span>
          </label>
        ))}
      </div>

      <div className="flex flex-col space-y-2">
        <button
          type="button"
          onClick={handleApply}
          className="w-55 h-10 p-2.5 bg-[#E48C3F] hover:bg-[#CB6E1C] text-white rounded-[10px] cursor-pointer font-semibold text-sm"
        >
          Применить
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-55 h-10 cursor-pointer hover:bg-[#ebeced] rounded-[10px] font-normal text-sm"
        >
          Сбросить
        </button>
      </div>
    </aside>
  );
}
