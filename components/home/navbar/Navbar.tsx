"use client";

import Search from "./Search";
import LanguageSwitcher from "./LanguageSwitcher";
import { navLinksHeader } from "@/constants/navLinksHeader";
import Image from "next/image";
import { LOGO } from "@/constants/Images";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal, closeLoginModal } from "@/src/store/slices/ModalSlice";
import { RootState } from "@/src/store";
import { useState } from "react";
import { logout } from "@/utilities/auth";
import { useRouter } from "next/navigation";
import LoginStepper from "@/components/auth/LoginStepper";
import SmartLink from "@/components/smartLink/SmartLink";
import { PiUserCircleFill } from "react-icons/pi";

export default function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoginOpen = useSelector(
    (state: RootState) => state.modal.isLoginOpen,
  );

  const handleOpen = () => dispatch(openLoginModal());
  const handleClose = () => dispatch(closeLoginModal());

  const handleLogout = () => {
    logout(dispatch);
  };

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
          <nav className="hidden md:flex gap-11 ml-21 mr-61 text-base font-semibold items-center">
            {navLinksHeader.map(({ href, label }) => {
              if (label === "Вход") {
                if (isLoading) {
                  return (
                    <div key="loading-user" className="text-gray-600">
                      loading...
                    </div>
                  );
                }

                return !user ? (
                  <button
                    key={href}
                    onClick={handleOpen}
                    className="cursor-pointer"
                  >
                    Вход
                  </button>
                ) : (
                  <div key="user-menu" className="relative">
                    <button
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <PiUserCircleFill className="w-[35px] h-[35px]" />
                      <svg
                        className={`w-4 h-4 transition-transform ${
                          dropdownOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-40 bg-white  rounded-lg shadow-md z-50">
                        <button
                          onClick={() => router.push("/user/profile")}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                        >
                          Профиль
                        </button>
                        <button
                          onClick={() => router.push("/user/favorites")}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                        >
                          Избранное
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm hover:bg-gray-100 rounded-lg"
                        >
                          Выйти
                        </button>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <SmartLink key={href} href={href} className="cursor-pointer">
                  {label}
                </SmartLink>
              );
            })}
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
