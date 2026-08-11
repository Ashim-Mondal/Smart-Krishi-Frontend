import { Link, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Eye, LogOut, Leaf } from "lucide-react";
import api from "../../services/api";

const links = [
  {
    label: "Dashboard",
    to: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "My Profile",
    to: "/dashboard/profile",
    icon: Eye,
  },
  {
    label: "My Products",
    to: "/dashboard/products",
    icon: Package,
  },
];

interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: string;
  block?: {
    id: number;
    blockName: string;
  } | null;
}

export default function Sidebar() {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("kb_user");

  let currentUser: User | null = null;

  if (storedUser) {
    try {
      currentUser = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error reading user data:", error);
    }
  }

  // Logout
  const handleLogout = async () => {
    try {
      // Call Spring Boot logout API
      await api.post("/users/logout");

      console.log("Backend logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Remove user from browser storage
      localStorage.removeItem("kb_user");

      // Go to login page
      navigate("/login", { replace: true });
    }
  };

  // User initials
  const userInitials = currentUser?.name
    ? currentUser.name
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  // Display role
  const displayRole =
    currentUser?.role === "farmer"
      ? "Farmer"
      : currentUser?.role === "wholesaler"
        ? "Wholesaler"
        : currentUser?.role || "User";

  return (
    <aside className="w-64 shrink-0 bg-[#0B1F14] text-white min-h-screen flex flex-col">
      {/* ================= LOGO ================= */}
      <NavLink to="/" className="flex items-center gap-2 px-5 py-5">
        <div className="flex items-center gap-2 px-5 py-5">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
            <Leaf size={18} />
          </span>

          <span className="text-lg font-extrabold tracking-tight">
            KrishiBlock
          </span>
        </div>
      </NavLink>

      {/* ================= USER INFORMATION ================= */}
      <div className="flex items-center gap-3 px-5 py-4 border-y border-white/10">
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-sm font-bold shrink-0">
          {userInitials}
        </div>

        {/* User Name & Role */}
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">
            {currentUser?.name || "User"}
          </p>

          <p className="text-xs text-white/50">{displayRole}</p>
        </div>
      </div>

      {/* ================= NAVIGATION ================= */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon size={17} />

              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ================= LOGOUT ================= */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors w-full"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}
