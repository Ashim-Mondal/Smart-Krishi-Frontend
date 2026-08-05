import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Eye,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";
import { currentUser } from "../../data/mockData";
import { notifications, enquiries } from "../../data/mockData";

const links = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "My Profile", to: "/dashboard/profile", icon: Eye },
  { label: "My Products", to: "/dashboard/products", icon: Package },
  { label: "Inquiries", to: "/dashboard", icon: MessageSquare, badge: enquiries.length },
  { label: "Messages", to: "/dashboard", icon: MessageSquare },
  { label: "Notifications", to: "/dashboard", icon: Bell, badge: notifications.length },
  { label: "Settings", to: "/dashboard", icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 bg-[#0B1F14] text-white min-h-screen flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
          <Leaf size={18} />
        </span>
        <span className="text-lg font-extrabold tracking-tight">KrishiBlock</span>
      </div>

      <div className="flex items-center gap-3 px-5 py-4 border-y border-white/10">
        <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-sm font-bold">
          {currentUser.ownerName.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{currentUser.ownerName}</p>
          <p className="text-xs text-white/50">Wholesaler</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ label, to, icon: Icon, end, badge }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive ? "bg-primary text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon size={17} />
              {label}
            </span>
            {badge ? (
              <span className="text-[11px] font-bold bg-danger text-white rounded-full w-5 h-5 flex items-center justify-center">
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full">
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
