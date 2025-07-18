"use client";

import { Guide } from "@/constants/Guides";
import { lazy, Suspense, useState } from "react";
import { useGetGuidesQuery } from "@/src/store/api/GuidesApi";
import { motion } from "framer-motion";
import SkeletonGuideCard from "./SkeletonGuideCard";
import { textClass } from "@/app/styles/lazyLodaingTextStyles";

const GuideCard = lazy(() => import("./GuideCard"));

export default function Guides() {
  const { data: guides, isLoading, error } = useGetGuidesQuery();
  const [showAll, setShowAll] = useState(false);

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center gap-14 flex-col my-24">
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonGuideCard key={index} />
        ))}
      </div>
    );
  }

  if (error || !guides) {
    return (
      <div className="text-center text-red-500 text-xl my-20">
        Ошибка при загрузке гидов...
      </div>
    );
  }

  const visibleGuides = showAll ? guides : guides.slice(0, 3);

  return (
    <div id="guides" className="container mx-auto flex flex-col gap-14 my-24">
      <Suspense
        fallback={<div className={textClass}>Загружается список гидов...</div>}
      >
        <div className="w-full flex flex-col gap-10">
          {visibleGuides.length === 0 ? (
            <p className="text-center text-gray-500 text-xl">
              Гиды не найдены.
            </p>
          ) : (
            <div className="w-full flex flex-col gap-10">
              {visibleGuides.map((guide: Guide, index: number) => (
                <GuideCard key={guide.id} guide={guide} index={index} />
              ))}
            </div>
          )}
        </div>
      </Suspense>

      {!showAll && guides.length > 3 && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-114 h-12 bg-[#40D885] self-center text-white rounded-[15px] font-medium text-xl cursor-pointer hover:bg-[#27B567] transform transition-transform hover:scale-105 duration-300"
          onClick={() => setShowAll(true)}
        >
          Все гиды
        </motion.button>
      )}
    </div>
  );
}
