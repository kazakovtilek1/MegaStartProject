"use client";

import { guides, Guide } from "@/constants/Guides";
import { getYearLabel } from "@/utilities/pluralize";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Guides() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const skeletons = Array.from({ length: 3 });

  const cardsAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
      },
    }),
  };

  return (
    <div className="flex justify-center gap-14 flex-wrap my-24">
      {loading
        ? skeletons.map((_, index) => (
            <div key={index} className="w-265 h-50 flex gap-8 animate-pulse">
              <div className="w-[200px] h-[200px] bg-gray-300 rounded" />
              <div className="flex flex-col gap-3 py-1">
                <div className="w-[120px] h-[24px] bg-gray-300 rounded" />
                <div className="flex gap-6">
                  <div className="w-[40px] h-[20px] bg-gray-300 rounded" />
                  <div className="w-[70px] h-[20px] bg-gray-300 rounded" />
                  <div className="w-[90px] h-[20px] bg-gray-300 rounded" />
                </div>
                <div className="w-[200px] h-[16px] bg-gray-300 rounded" />
              </div>
            </div>
          ))
        : guides.map((guide: Guide, index) => (
            <motion.div
              key={guide.id}
              className="w-265 h-50 flex justify-center gap-8"
              variants={cardsAnimation}
              initial="hidden"
              animate="visible"
              custom={index}
            >
              <Image
                src={guide.image}
                alt={guide.name}
                width={200}
                height={200}
              />
              <div>
                <h4 className="font-semibold text-xl">{guide.name}</h4>
                <div className="flex justify-start gap-6 my-2.5">
                  <div className="flex justify-center items-center font-medium text-lg">
                    {guide.rating}
                    <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
                  </div>
                  <p className="font-medium text-lg">{guide.reviews} отзывов</p>
                  <p className="font-medium text-lg">
                    {guide.experience} {getYearLabel(guide.experience)} опыта
                  </p>
                </div>
                <p className="font-normal text-base">{guide.description}</p>
              </div>
            </motion.div>
          ))}

      {!loading && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-114 h-12 bg-[#40D885] text-white rounded-[15px] font-medium text-xl cursor-pointer hover:bg-[#d89640] transform transition-transform hover:scale-105 duration-300"
        >
          Все гиды
        </motion.button>
      )}
    </div>
  );
}
