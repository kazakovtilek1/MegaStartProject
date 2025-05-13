"use client";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/home/navbar/Navbar";
import ToursCards from "@/components/toursCards/ToursCards";
import ToursFilterForm from "@/components/toursFilterForm/ToursFilterForm";
import { useState, useEffect } from "react";

type FilterType = "all" | "best" | "private";

export default function ToursPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  useEffect(() => {
    const stored = localStorage.getItem("tourFilter") as FilterType | null;
    if (stored) {
      setFilter(stored);
    }
  }, []);

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
    localStorage.setItem("tourFilter", newFilter);
  };

  const filters = [
    { key: "all", label: "Все туры" },
    { key: "best", label: "Лучшие туры" },
    { key: "private", label: "Индивидуальные туры" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div>
        <Navbar />
        <div className="flex mt-25">
          <div>
            <div className="flex flex-col gap-6">
              <h3 className="font-semibold text-2xl underline">Туры</h3>
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleFilterChange(key as FilterType)}
                  className={`cursor-pointer text-start transition-all duration-300 ease-in-out ${
                    filter === key
                      ? "font-semibold text-xl"
                      : "font-normal text-base"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div>
              <ToursFilterForm />
            </div>
          </div>
          <ToursCards isFullPage />
        </div>
      </div>
      <Footer />
    </div>
  );
}
