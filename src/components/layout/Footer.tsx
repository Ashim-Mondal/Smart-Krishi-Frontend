import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.58 14.24 3.58c-2.4 0-4.04 1.47-4.04 4.16V9.9H7.5V13h2.7v8h3.3z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5l5 2.5-5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="container-app py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary text-white">
            <Leaf size={14} />
          </span>
          <span className="text-sm text-muted">© 2024 KrishiBlock. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <Link to="/about" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="/about" className="hover:text-primary transition-colors">Terms &amp; Conditions</Link>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="p-2 rounded-lg bg-slate-100 text-muted hover:text-primary hover:bg-primary/10 transition-colors">
            <FacebookIcon />
          </a>
          <a href="#" className="p-2 rounded-lg bg-slate-100 text-muted hover:text-primary hover:bg-primary/10 transition-colors">
            <InstagramIcon />
          </a>
          <a href="#" className="p-2 rounded-lg bg-slate-100 text-muted hover:text-primary hover:bg-primary/10 transition-colors">
            <YoutubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}
