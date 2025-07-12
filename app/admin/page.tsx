import AdminFinance from "@/components/admin/finance/adminFinance";
import AdminTours from "@/components/admin/tours/adminTours";
import AdminUsers from "@/components/admin/users/adminUsers";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-center gap-5">
      <AdminTours />
      <AdminUsers />
      <AdminFinance />
    </div>
  );
}
