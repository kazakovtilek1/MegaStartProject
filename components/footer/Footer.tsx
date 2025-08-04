import { FOOTERVECTOR, LOGO } from "@/constants/Images";
import Image from "next/image";
import { navLinksFooter } from "@/constants/navLinksFooter";
import { FaFacebook } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { CiMail } from "react-icons/ci";
import { LuPhone } from "react-icons/lu";
import SmartLink from "@/components/smartLink/SmartLink";

export default function Footer() {
  return (
    <footer className="container mx-auto flex justify-between items-center py-5 px-23 w-full border border-solid rounded-[20px] mt-9 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.25)]">
      <div>
        <Image src={LOGO} alt="LOGO" width={117} height={59} />
      </div>
      <div className="flex flex-col justify-between">
        {navLinksFooter.map(({ href, label }) => (
          <SmartLink key={href} href={href} className="p-2.5">
            {label}
          </SmartLink>
        ))}
      </div>
      <div className="flex flex-col gap-11">
        <div className="flex items-center gap-[3px]">
          <FaFacebook className="w-12 h-12" />
          <p className="p-2.5">takhminam</p>
        </div>
        <div className="flex items-center gap-[3px]">
          <SlSocialInstagram className="w-12 h-12" />
          <p className="p-2.5">@takhminam</p>
        </div>
        <div className="flex items-center gap-[3px]">
          <CiMail className="w-12 h-12" />
          <p className="p-2.5">takhminam@email.com</p>
        </div>
      </div>
      <div className="flex flex-col gap-14">
        <div className="flex items-center">
          <Image src={FOOTERVECTOR} alt="Vector" width={50} height={45} />
          <p className="whitespace-pre-line p-2.5">
            {"ул. Тыныстанова\nБЦ “Бизнес Центр”\n3-й этаж, офис 5"}
          </p>
        </div>
        <div className="flex items-center">
          <LuPhone className="w-12 h-12" />
          <p className="p-2.5">+ 996 700 000 000</p>
        </div>
      </div>
    </footer>
  );
}
