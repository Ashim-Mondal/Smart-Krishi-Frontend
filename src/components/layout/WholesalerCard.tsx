import { Link } from "react-router-dom";
import { BadgeCheck, Landmark } from "lucide-react";
import type { Wholesaler } from "../../types";

export default function WholesalerCard({ wholesaler }: { wholesaler: Wholesaler }) {
  return (
    <Link
      to={`/wholesalers/${wholesaler.id}`}
      className="flex items-center gap-3 bg-white rounded-2xl border border-border p-4 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0"
        style={{ backgroundColor: wholesaler.logoColor }}
      >
        <Landmark size={18} />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-ink truncate">{wholesaler.businessName}</p>
        <p className="text-xs text-muted truncate">{wholesaler.village}</p>
        {wholesaler.verified && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary mt-0.5">
            <BadgeCheck size={12} /> Verified
          </span>
        )}
      </div>
    </Link>
  );
}
