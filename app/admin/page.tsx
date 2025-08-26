import AdminFinance from "@/components/admin/finance/AdminFinance";
import AdminTours from "@/components/admin/tours/AdminTourCards";
import AdminUsers from "@/components/admin/users/AdminUsers";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center gap-5 mt-21">
      <AdminTours />
      <AdminUsers />
      <AdminFinance />
    </div>
  );
}
