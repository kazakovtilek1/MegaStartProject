"use client";

import Link from "next/link";
import Search from "./Search";
import LanguageSwitcher from "./LanguageSwitcher";
import { navLinksHeader } from "@/constants/navLinksHeader";
import Image from "next/image";
import { LOGO } from "@/constants/Images";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, closeLoginModal } from "@/src/store/slices/ModalSlice";
import { RootState } from "@/src/store";
import LoginStepper from "@/components/auth/LoginStepper";

export default function Navbar() {
  const dispatch = useDispatch();
  const isLoginOpen = useSelector(
    (state: RootState) => state.modal.isLoginOpen,
  );

  const handleOpen = () => dispatch(openLoginModal());
  const handleClose = () => dispatch(closeLoginModal());

  return (
    <header className="w-full h-[15vh] 2xl:h-[10vh] rounded-[20px] bg-[#FFFFFF80]/50 backdrop:blur shadow-sm">
      <div className="flex justify-center items-center">
        <div>
          <Image
            src={LOGO}
            width={70}
            height={68}
            alt="LOGO"
            className="object-contain md:w-16 lg:w-20 xl:w-26"
          />
        </div>
        <div>
          <nav className="hidden md:flex gap-11 ml-21 mr-61 text-base font-semibold">
            {navLinksHeader.map(({ href, label }) =>
              label === "Вход" ? (
                <button
                  className="cursor-pointer"
                  key={href}
                  onClick={handleOpen}
                >
                  {label}
                </button>
              ) : (
                <Link key={href} href={href}>
                  {label}
                </Link>
              ),
            )}
          </nav>
        </div>
        <div className="flex gap-11">
          <Search />
          <LanguageSwitcher />
        </div>
      </div>
      {isLoginOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-10
                  bg-transparent backdrop-blur-sm"
        >
          <div className="bg-white rounded-[20px] w-112 py-10 px-11.5 shadow-lg">
            <LoginStepper onClose={handleClose} />
          </div>
        </div>
      )}
    </header>
  );
}
