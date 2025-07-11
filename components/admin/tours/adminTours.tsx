import { adminBoldTextClass } from "@/app/styles/admin/BoldTextStyles";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function AdminTours() {
  return (
    <div>
      <h2 className={adminBoldTextClass}>
        Туры <IoIosArrowForward />
      </h2>
    </div>
  );
}
