"use client";

import { Guide } from "@/constants/Guides";
import { lazy, Suspense } from "react";
import { useGetGuidesQuery } from "@/src/store/slices/GuidesApi";
import { motion } from "framer-motion";
import SkeletonGuideCard from "./SkeletonGuideCard";
import { textClass } from "@/app/styles/lazyLodaingTextStyles";

const GuideCard = lazy(() => import("./GuideCard"));

export default function Guides() {
  const { data: guides, isLoading, error } = useGetGuidesQuery();

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
        Не удалось загрузить список гидов.
      </div>
    );
  }

  return (
    <div
      id="guides"
      className="container mx-auto flex justify-center items-center gap-14 flex-col my-24"
    >
      <Suspense
        fallback={<div className={textClass}>Загружается список гидов...</div>}
      >
        {guides.map((guide: Guide, index) => (
          <GuideCard key={guide.id} guide={guide} index={index} />
        ))}
      </Suspense>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-114 h-12 bg-[#40D885] text-white rounded-[15px] font-medium text-xl cursor-pointer hover:bg-[#27B567] transform transition-transform hover:scale-105 duration-300"
      >
        Все гиды
      </motion.button>
    </div>
  );
}
