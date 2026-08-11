import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Leaf, User } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Daily Market Price", to: "/daily-market-price" },
  { label: "Wholesalers", to: "/wholesalers" },
  // { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" },
];

interface LoggedInUser {
  id?: number | string;
  name?: string;
  fullName?: string;
  username?: string;
  email?: string;
  profileImage?: string;
  image?: string;
  role?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("kb_user");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Invalid kb_user data:", error);
          localStorage.removeItem("kb_user");
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Load user when Navbar mounts
    loadUser();

    // Listen for login/logout in the same tab
    window.addEventListener("kb-auth-change", loadUser);

    // Listen for localStorage changes from other tabs
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("kb-auth-change", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const getUserName = () => {
    if (!user) return "";

    return user.name || user.fullName || user.username || user.email || "User";
  };

  const getInitials = () => {
    const name = getUserName();

    if (!name) {
      return "U";
    }

    // If email is being used, take first character
    if (name.includes("@")) {
      return name.charAt(0).toUpperCase();
    }

    const parts = name.trim().split(/\s+/);

    if (parts.length >= 2) {
      return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }

    return name.charAt(0).toUpperCase();
  };

  const profileImage = user?.profileImage || user?.image;

  // const profileImage = "https://xsgames.co/randomusers/avatar.php?g=male";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur">
      <div className="container-app flex items-center justify-between gap-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white">
            <Leaf size={20} />
          </div>

          <span className="font-extrabold text-lg text-ink">Smart Krishi</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors relative pb-1 ${
                  isActive ? "text-primary" : "text-ink/70 hover:text-primary"
                }`
              }
            >
              {({ isActive }) => (
                <span className="relative">
                  {link.label}

                  {isActive && (
                    <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary rounded-full" />
                  )}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Side - Login OR Profile */}
        {user ? (
          <Link
            to="/dashboard"
            className="shrink-0 flex items-center gap-2 group"
            title="Go to Dashboard"
          >
            {/* Profile Image / Initials */}
            <div className="w-9 h-9 rounded-full bg-primary-light flex items-center justify-center overflow-hidden border border-primary/20">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={getUserName()}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold text-primary">
                  {getInitials()}
                </span>
              )}
            </div>

            {/* User Name */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                {getUserName()}
              </span>

              <span className="text-[11px] text-muted">View Profile</span>
            </div>
          </Link>
        ) : (
          <Link to="/login" className="shrink-0">
            <Button variant="primary" size="sm">
              Login
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
