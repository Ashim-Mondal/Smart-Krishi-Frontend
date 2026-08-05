import { Pencil, Trash2, Plus, Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import StatsCard from "../../components/layout/StatsCard";
import Button from "../../components/ui/Button";
import EditProfile from "./EditProfile";
import { useDisclosure } from "../../hooks/useDisclosure";
import { useAppContext } from "../../context/AppContext";
import { dashboardStats, notifications, enquiries } from "../../data/mockData";

const notifIcon = { info: Info, success: CheckCircle2, warning: AlertTriangle };

export default function Dashboard() {
  const { profile } = useAppContext();
  const editPanel = useDisclosure();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-xl font-extrabold text-ink">Dashboard</h1>
        <Button variant="outline" size="sm" icon={<Pencil size={14} />} onClick={editPanel.open}>
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((s) => (
          <StatsCard key={s.id} stat={s} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-ink">Your Products</h2>
            <Button size="sm" icon={<Plus size={14} />}>Add Product</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-border">
                  <th className="pb-2 font-medium">Product</th>
                  <th className="pb-2 font-medium">Quantity</th>
                  <th className="pb-2 font-medium">Price (100)</th>
                  <th className="pb-2 font-medium">Last Updated</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {profile.products.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="py-2.5 flex items-center gap-2 font-medium text-ink">
                      <span className="text-lg">{p.image}</span> {p.name}
                    </td>
                    <td className="py-2.5 text-ink">{p.buyingQuantity}</td>
                    <td className="py-2.5 text-ink">₹{p.buyingPrice.toLocaleString("en-IN")}</td>
                    <td className="py-2.5 text-muted">{p.lastUpdated}</td>
                    <td className="py-2.5">
                      <span className="text-xs font-semibold text-success bg-green-50 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </td>
                    <td className="py-2.5">
                      <button className="text-primary hover:text-primary-dark mr-3">
                        <Pencil size={14} />
                      </button>
                      <button className="text-danger hover:text-red-700">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
              <Bell size={15} className="text-primary" /> Notifications
            </h2>
            <div className="space-y-3">
              {notifications.map((n) => {
                const Icon = notifIcon[n.type];
                return (
                  <div key={n.id} className="flex items-start gap-2.5 text-sm">
                    <Icon size={15} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-ink leading-snug">{n.title}</p>
                      <p className="text-[11px] text-muted">{n.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-bold text-ink mb-4">Recent Inquiries</h2>
            <div className="space-y-3">
              {enquiries.map((e) => (
                <div key={e.id} className="flex items-start gap-2.5 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center shrink-0">
                    {e.avatar}
                  </div>
                  <div>
                    <p className="text-ink font-medium leading-snug">{e.name}</p>
                    <p className="text-xs text-muted">{e.message}</p>
                    <p className="text-[11px] text-muted mt-0.5">{e.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EditProfile open={editPanel.isOpen} onClose={editPanel.close} />
    </div>
  );
}
