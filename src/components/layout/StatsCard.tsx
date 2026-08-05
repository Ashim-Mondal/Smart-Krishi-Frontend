import type { DashboardStat } from "../../types";

export default function StatsCard({ stat }: { stat: DashboardStat }) {
  return (
    <div className="card p-5 text-center">
      <p className="text-xs font-semibold text-muted mb-2">{stat.label}</p>
      <p className="text-3xl font-extrabold text-ink">{stat.value}</p>
      <p className="text-[11px] text-muted mt-1">{stat.sublabel}</p>
    </div>
  );
}
