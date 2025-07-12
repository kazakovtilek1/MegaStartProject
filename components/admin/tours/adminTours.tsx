import {
  adminBoldTextClass,
  adminDashboardBoxClass,
  adminLinkTextClass,
  adminLinkTitleClass,
  adminNormalTextClass,
} from "@/app/styles/admin/dashboard/AdminDashboardStyles";
import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function AdminTours() {
  return (
    <div className="w-full sm:w-[48%] xl:w-[30%] min-w-[250px]">
      <Link href="/admin/tours" className={adminLinkTitleClass}>
        <h2 className={adminBoldTextClass}>
          Туры <IoIosArrowForward />
        </h2>
      </Link>
      <div className={`${adminNormalTextClass} ${adminDashboardBoxClass}`}>
        <Link href="/admin/tours" className={adminLinkTextClass}>
          <p>Всего туров</p>
          <p>58</p>
        </Link>
        <Link href="/admin/tours/active" className={adminLinkTextClass}>
          <p>Активные туры</p>
          <p>50</p>
        </Link>
        <Link href="/admin/tours/archive" className={adminLinkTextClass}>
          <p>Туры в архиве</p>
          <p>8</p>
        </Link>
      </div>
    </div>
  );
}
