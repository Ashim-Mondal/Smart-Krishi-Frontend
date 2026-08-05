import { Link } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import { products } from "../../data/mockData";

export default function Products() {
  return (
    <div className="container-app py-10">
      <SectionTitle title="All Products" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.slug}`}
            className="card p-5 flex flex-col items-center gap-3 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center text-3xl">
              {p.image}
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-ink">{p.name}</p>
              <p className="text-xs text-muted mt-0.5">₹{p.avgPrice.toLocaleString("en-IN")} / {p.unit}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
