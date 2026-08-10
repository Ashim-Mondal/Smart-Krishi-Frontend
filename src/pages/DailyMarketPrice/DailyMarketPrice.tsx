import { useEffect, useState } from "react";
import { getDailyMarketPrices } from "../../services/dailyMarketPriceService";
import type { DailyMarketPrice as DailyMarketPriceType } from "../../types";

export default function DailyMarketPrice() {
  const [prices, setPrices] = useState<DailyMarketPriceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrices = async () => {
      try {
        setLoading(true);
        setError("");

        const priceData = await getDailyMarketPrices();

        setPrices(priceData);
      } catch (err) {
        console.error("Failed to load daily market prices:", err);
        setError("Unable to load daily market prices.");
      } finally {
        setLoading(false);
      }
    };

    loadPrices();
  }, []);

  return (
    <div className="container-app mt-8">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-ink">Daily Market Price</h1>

        <p className="text-sm text-muted mt-1">
          Latest daily wholesale market prices
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="px-5 py-4 font-semibold text-ink">Product</th>

                <th className="px-5 py-4 font-semibold text-ink">
                  Market Price
                </th>

                <th className="px-5 py-4 font-semibold text-ink">Quantity</th>

                <th className="px-5 py-4 font-semibold text-ink">Status</th>

                <th className="px-5 py-4 font-semibold text-ink">Date</th>

                <th className="px-5 py-4 font-semibold text-ink">Block</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
                    Loading daily market prices...
                  </td>
                </tr>
              ) : prices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
                    No daily market prices found.
                  </td>
                </tr>
              ) : (
                prices.map((price, index) => (
                  <tr
                    key={`${price.product}-${price.date}-${price.marketPrice}-${index}`}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-5 py-4 text-ink font-medium">
                      {price.product}
                    </td>

                    <td className="px-5 py-4 font-semibold text-primary">
                      ₹{price.marketPrice.toLocaleString("en-IN")}
                    </td>

                    <td className="px-5 py-4 text-ink">{price.quantity}</td>

                    <td className="px-5 py-4">
                      {price.status === "Done" ? (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          Done
                        </span>
                      ) : (
                        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 text-ink">{price.date}</td>

                    <td className="px-5 py-4 text-ink">{price.block}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
