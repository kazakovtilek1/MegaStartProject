"use client";

import { guides, Guide } from "@/constants/Guides";
import { useEffect, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import SkeletonGuideCard from "./SkeletonGuideCard";
import { textClass } from "@/app/styles/lazyLodaingTextStyles";

const GuideCard = lazy(() => import("./GuideCard"));

export default function Guides() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center gap-14 flex-wrap my-24">
      {loading ? (
        Array.from({ length: 3 }).map((_, index) => (
          <SkeletonGuideCard key={index} />
        ))
      ) : (
        <Suspense
          fallback={
            <div className={textClass}>Загружается список гидов...</div>
          }
        >
          {guides.map((guide: Guide, index) => (
            <GuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </Suspense>
      )}
      {!loading && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-114 h-12 bg-[#40D885] text-white rounded-[15px] font-medium text-xl cursor-pointer hover:bg-[#27B567] transform transition-transform hover:scale-105 duration-300"
        >
          Все гиды
        </motion.button>
      )}
    </div>
  );
}
