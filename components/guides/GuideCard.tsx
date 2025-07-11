"use client";

import { Guide } from "@/constants/Guides";
import { getYearLabel } from "@/utilities/pluralize";
import { motion } from "framer-motion";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";
import { cardsAnimation } from "@/app/animations/GuidesCardsAnimations";

type GuideCardProps = {
  guide: Guide;
  index: number;
};

export default function GuideCard({ guide, index }: GuideCardProps) {
  return (
    <motion.div
      key={guide.id}
      className="w-265 h-50 flex justify-center gap-8"
      variants={cardsAnimation}
      initial="hidden"
      animate="visible"
      custom={index}
    >
      <div className="flex gap-8">
        <div>
          <Image
            src={guide.image}
            alt={guide.name}
            width={200}
            height={200}
            className="rounded"
          />
        </div>
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
      </div>
    </motion.div>
  );
}
