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

export default function AdminUsers() {
  return (
    <div className="w-full sm:w-[48%] xl:w-[30%] min-w-[250px]">
      <Link href="/admin/users" className={adminLinkTitleClass}>
        <h2 className={adminBoldTextClass}>
          Пользователи <IoIosArrowForward />
        </h2>
      </Link>
      <div className={`${adminNormalTextClass} ${adminDashboardBoxClass}`}>
        <Link href="/admin/users/managers" className={adminLinkTextClass}>
          <p>Менеджеры</p>
          <p>20</p>
        </Link>
        <Link href="/admin/users" className={adminLinkTextClass}>
          <p>Пользователи</p>
          <p>250</p>
        </Link>
      </div>
    </div>
  );
}
