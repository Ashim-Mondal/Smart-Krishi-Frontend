import { Link, useParams } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import { products, wholesalers } from "../../data/mockData";
import Button from "../../components/ui/Button";

export default function ProductDetail() {
  const { product: slug } = useParams();
  const product = products.find((p) => p.slug === slug) ?? products[0];

  const sellers = wholesalers
    .map((w) => ({ w, entry: w.products.find((p) => p.name === product.name) }))
    .filter((x) => x.entry);

  return (
    <div className="container-app py-8">
      <div className="text-sm text-muted mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> {" > "}
        <Link to="/products" className="hover:text-primary">Products</Link> {" > "}
        <span className="text-ink font-medium">{product.name}</span>
      </div>

      <div className="card p-6 flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{product.name}</h1>
          <p className="text-xs text-muted mt-1">Average Market Price Today</p>
          <p className="text-2xl font-extrabold text-primary mt-1">
            ₹{product.avgPrice.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-medium text-muted">/ {product.unit}</span>
          </p>
          <p className="text-xs text-muted mt-1">Price updated: {product.updatedAt}</p>
        </div>
        <div className="w-24 h-24 rounded-2xl bg-primary-light flex items-center justify-center text-5xl">
          {product.image}
        </div>
      </div>

      <h2 className="text-lg font-bold text-ink mb-4">Wholesalers Buying This Product</h2>
      <div className="space-y-3">
        {sellers.map(({ w, entry }) => (
          <div key={w.id} className="card p-4 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-[10px] text-center leading-tight shrink-0"
                style={{ backgroundColor: w.logoColor }}
              >
                {w.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-ink">{w.name}</p>
                <p className="text-xs text-muted flex items-center gap-1">
                  <MapPin size={11} /> {w.village}, {w.block.split(",")[0]}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-muted">Buying Quantity</p>
              <p className="text-sm font-semibold text-ink">{entry?.buyingQuantity}</p>
            </div>
            <div className="text-center">
              <p className="text-[11px] text-muted">Price (Per 100)</p>
              <p className="text-sm font-semibold text-ink">₹{entry?.buyingPrice.toLocaleString("en-IN")}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/wholesalers/${w.id}`}>
                <Button variant="primary" size="sm">View Profile</Button>
              </Link>
              <a href={`https://wa.me/${w.phone.replace(/\s|\+/g, "")}`} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" icon={<MessageCircle size={14} />} />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
        Note: Prices and quantity may change. Please contact wholesaler for latest updates.
      </div>
    </div>
  );
}
