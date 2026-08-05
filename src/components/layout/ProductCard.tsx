import { Link } from "react-router-dom";
import type { Product } from "../../types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-border p-4 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center text-2xl">
        {product.image}
      </div>
      <span className="text-sm font-semibold text-ink">{product.name}</span>
    </Link>
  );
}
