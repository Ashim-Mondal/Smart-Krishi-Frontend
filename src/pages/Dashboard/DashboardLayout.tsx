import { Outlet } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-bg">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-8 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
