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

export default function AdminFinance() {
  return (
    <div className="w-full sm:w-[48%] xl:w-[30%] min-w-[250px]">
      <Link href="/admin/finance" className={adminLinkTitleClass}>
        <h2 className={adminBoldTextClass}>
          Финансы <IoIosArrowForward />
        </h2>
      </Link>
      <div className={`${adminNormalTextClass} ${adminDashboardBoxClass}`}>
        <Link href="/admin/finance" className={adminLinkTextClass}>
          <p>Всего доходов</p>
          <p>500 000</p>
        </Link>
      </div>
    </div>
  );
}
