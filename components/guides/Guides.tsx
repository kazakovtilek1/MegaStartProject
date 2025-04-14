import { guides, Guide } from "@/constants/Guides";
import Image from "next/image";
import { LiaStarSolid } from "react-icons/lia";

export default function Guides() {
  return (
    <div className="flex justify-center gap-14 flex-wrap my-24">
      {guides.map((guide: Guide) => {
        return (
          <div key={guide.id} className="w-265 h-50 flex justify-center gap-8">
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
                  {guide.raiting}
                  <LiaStarSolid className="w-6 h-5 text-[#E48C3F]" />
                </div>
                <p className="font-medium text-lg">{guide.reviews} отзывов</p>
                <p className="font-medium text-lg">
                  {guide.experience} года опыта
                </p>
              </div>
              <p className="font-normal text-base">{guide.description}</p>
            </div>
          </div>
        );
      })}
      <button className="w-114 h-12 bg-[#40D885] text-white rounded-[15px] font-medium text-xl cursor-pointer hover:bg-[#d89640] transform transition-transform hover:scale-105 duration-300">
        Все гиды
      </button>
    </div>
  );
}
