"use client";

import Link from "next/link";
import React from "react";

type SmartLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function SmartLink({
  href,
  children,
  className,
}: SmartLinkProps) {
  const isAnchor = href.startsWith("#");

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (el) {
      el.scrollIntoView({ behavior: "smooth" });

      // Удаляем #из URL без перезагрузки страницы
      history.replaceState(null, "", window.location.pathname);
    }
  };

  return isAnchor ? (
    <a href={href} onClick={handleAnchorClick} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
