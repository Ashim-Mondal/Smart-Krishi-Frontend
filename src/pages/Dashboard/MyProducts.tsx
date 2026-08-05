import { Pencil, Trash2, Plus } from "lucide-react";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";

export default function MyProducts() {
  const { profile } = useAppContext();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-extrabold text-ink">My Products</h1>
        <Button size="sm" icon={<Plus size={14} />}>Add Product</Button>
      </div>

      <div className="card p-5">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-border">
                <th className="pb-2 font-medium">Product</th>
                <th className="pb-2 font-medium">Quantity</th>
                <th className="pb-2 font-medium">Price (Per 100)</th>
                <th className="pb-2 font-medium">Last Updated</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {profile.products.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="py-3 flex items-center gap-2 font-medium text-ink">
                    <span className="text-lg">{p.image}</span> {p.name}
                  </td>
                  <td className="py-3 text-ink">{p.buyingQuantity}</td>
                  <td className="py-3 text-ink">₹{p.buyingPrice.toLocaleString("en-IN")}</td>
                  <td className="py-3 text-muted">{p.lastUpdated}</td>
                  <td className="py-3">
                    <span className="text-xs font-semibold text-success bg-green-50 px-2 py-1 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="py-3">
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
    </div>
  );
}
