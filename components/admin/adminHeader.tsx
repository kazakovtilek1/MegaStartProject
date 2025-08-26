import Link from "next/link";
import { navLinksAdminHeader } from "@/constants/navLinksAdminHeader";
import Image from "next/image";
import { LOGO } from "@/constants/Images";

export default function AdminHeader() {
  return (
    <div className="container mx-auto">
      <header className="w-full h-[15vh] 2xl:h-[10vh] rounded-[20px] bg-[#FFFFFF80]/50 backdrop:blur shadow-sm">
        <nav className="hidden md:flex justify-between items-center ml-21 mr-61 text-base font-semibold">
          <Image
            src={LOGO}
            width={70}
            height={68}
            alt="LOGO"
            className="object-contain md:w-16 lg:w-20 xl:w-26"
          />
          {navLinksAdminHeader.map((link) => (
            <Link key={link.href} href={link.href} className="cursor-pointer">
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
