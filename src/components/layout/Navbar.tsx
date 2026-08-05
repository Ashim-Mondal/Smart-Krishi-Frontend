import { Link, NavLink } from "react-router-dom";
import { Search, Leaf } from "lucide-react";
import Button from "../ui/Button";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Wholesalers", to: "/wholesalers" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container-app flex items-center justify-between h-16 gap-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white">
            <Leaf size={18} />
          </span>
          <span className="text-lg font-extrabold text-ink tracking-tight">Smart Krishi</span>
        </Link>

        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <Search size={16} className="absolute left-3.5 text-muted" />
          <input
            type="text"
            placeholder="Search products, wholesalers..."
            className="w-full rounded-xl border border-border bg-slate-50 pl-9 pr-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

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

        <Link to="/login" className="shrink-0">
          <Button variant="primary" size="sm">
            Login
          </Button>
        </Link>
      </div>
    </header>
  );
}
