"use client";

import Link from "next/link";
import Search from "./Search";
import Switcher from "./Switcher";

export default function Navbar() {
  return (
    <div className="flex justify-center items-center w-348 h-25 rounded-[20px] bg-[#FFFFFF80]/50 backdrop:blur shadow-sm">
      <div className="ml-13 mr-21">
        <h2
          className="text-base font-normal"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          LOGO
        </h2>
      </div>
      <div>
        <nav className="flex gap-11 text-base font-semibold">
          <Link href="/">Главная</Link>
          <Link href="/tours">Туры</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/login">Вход</Link>
        </nav>
      </div>
      <Search />
      <Switcher />
    </div>
  );
}
