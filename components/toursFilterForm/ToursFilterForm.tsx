import React, { useState } from "react";
import { regions, filterOptions } from "@/constants/ToursFilterList";

export default function ToursFilterForm() {
  const [region, setRegion] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: boolean }>({});

  const handleCheckboxChange = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleReset = () => {
    setRegion("");
    setFilters({});
  };

  const handleApply = () => {
    console.log("Регион:", region);
    console.log("Фильтры:", filters);
  };

  return (
    <aside className="w-65 h-185 mt-36 mr-16 border border-dashed border-[#9747FF] rounded-[5px] p-5">
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
