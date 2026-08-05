import { motion } from "framer-motion";
import { Users, Package, UserCheck, ShieldCheck } from "lucide-react";
import SearchBar from "../../components/layout/SearchBar";
import WeatherCard from "../../components/layout/WeatherCard";
import ProductCard from "../../components/layout/ProductCard";
import WholesalerCard from "../../components/layout/WholesalerCard";
import SectionTitle from "../../components/ui/SectionTitle";
import { products, marketPrices, wholesalers, weather } from "../../data/mockData";

const heroStats = [
  { icon: Users, value: "50+", label: "Verified Wholesalers" },
  { icon: Package, value: "100+", label: "Products Listed" },
  { icon: UserCheck, value: "500+", label: "Farmers Connected" },
  { icon: ShieldCheck, value: "100%", label: "Verified & Trusted" },
];

export default function Home() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary-light/60 to-bg">
        <div className="container-app pt-10 pb-8 grid lg:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-ink leading-tight">
              Find Verified <br /> Wholesalers in Your Block
            </h1>
            <p className="text-muted mt-3 mb-6 max-w-md">
              Trusted buyers. Better farming. Stronger farming.
            </p>
            <SearchBar />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              {heroStats.map(({ icon: Icon, value, label }) => (
                <div key={label} className="card p-3 flex flex-col items-start gap-1">
                  <Icon size={16} className="text-primary" />
                  <span className="text-base font-extrabold text-ink">{value}</span>
                  <span className="text-[11px] text-muted leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-card overflow-hidden shadow-soft border border-border h-64 sm:h-80 bg-gradient-to-br from-primary/20 to-amber-100 flex items-end justify-center"
          >
            <div className="text-7xl mb-6">🧑‍🌾</div>
          </motion.div>
        </div>
      </section>

      <div className="container-app mt-8 grid lg:grid-cols-3 gap-6">
        {/* Market prices */}
        <div className="lg:col-span-2 card p-5">
          <h3 className="text-sm font-bold text-ink mb-4">Today's Market Price ({weather.location})</h3>
          <div className="space-y-3">
            {marketPrices.map((mp) => (
              <div key={mp.id} className="flex items-center justify-between text-sm">
                <span className="text-ink font-medium">{mp.productName}</span>
                <span className="text-muted">₹{mp.price.toLocaleString("en-IN")} / {mp.unit}</span>
              </div>
            ))}
          </div>
          <button className="text-xs font-semibold text-primary mt-4 hover:text-primary-dark transition-colors">
            View All Prices
          </button>
        </div>

        <WeatherCard />
      </div>

      {/* Popular products */}
      <div className="container-app mt-10">
        <SectionTitle title="Popular Products" actionLabel="View All Products" actionTo="/products" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* Wholesalers */}
      <div className="container-app mt-10">
        <SectionTitle title="Top Verified Wholesalers" actionLabel="View All" actionTo="/wholesalers" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {wholesalers.map((w) => (
            <WholesalerCard key={w.id} wholesaler={w} />
          ))}
        </div>
      </div>
    </div>
  );
}
