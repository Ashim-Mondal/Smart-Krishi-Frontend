import { Link, useParams } from "react-router-dom";

import { MapPin, MessageCircle } from "lucide-react";

import Button from "../../components/ui/Button";

import { useAppContext } from "../../context/AppContext";

import type { DailyMarketPrice } from "../../types";
import { randomColorStyle } from "../../utils/cn";

export default function ProductDetail() {
  const { product: slug } = useParams();

  const {
    productNames,
    productList,
    dailyMarketPricesOriginal,
    wholesalers,
    marketPricesLoading,
    marketPricesError,
  } = useAppContext();

  console.log("Product Names:", productNames);

  console.log("Product List:", productList);

  console.log("Original Market Prices:", dailyMarketPricesOriginal);

  console.log("Wholesalers:", wholesalers);

  // -----------------------------------------
  // Loading
  // -----------------------------------------

  if (marketPricesLoading) {
    return <div>Loading product...</div>;
  }

  // -----------------------------------------
  // Error
  // -----------------------------------------

  if (marketPricesError) {
    return <div>{marketPricesError}</div>;
  }

  // -----------------------------------------
  // 1. Find product name from URL slug
  // -----------------------------------------

  const productName = productNames.find(
    (name) => name.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!productName) {
    return <div>Product not found.</div>;
  }

  console.log("Selected Product Name:", productName);

  // -----------------------------------------
  // 2. Find product from ProductList
  // -----------------------------------------

  const productData = productList.find(
    (product) =>
      product.productName?.toLowerCase() === productName.toLowerCase(),
  );

  console.log("Product Data:", productData);

  if (!productData) {
    return <div>Product data not found.</div>;
  }

  // -----------------------------------------
  // 3. Get product ID
  // -----------------------------------------

  const productId = productData.id;

  console.log("Product ID:", productId);

  // -----------------------------------------
  // 4. Find daily market price
  // -----------------------------------------

  const dailyPriceData: DailyMarketPrice[] = dailyMarketPricesOriginal.filter(
    (price) => String(price.productId) === String(productId),
  );

  console.log("Daily Price Data:", dailyPriceData);

  // -----------------------------------------
  // 5. Create final product object
  // -----------------------------------------

  const finalProductData = {
    productName: productName,

    productId: dailyPriceData[0]?.productId ?? productId,

    quantity: productData.quantity,

    wholesalePrice: dailyPriceData[0]?.wholesalePrice ?? 0,

    imageUrl: productData.productImageId?.imageUrl ?? "",
  };

  console.log("Final Product Data:", finalProductData);

  // -----------------------------------------
  // 6. Find wholesalers who have this product
  //
  // wholesalers already contains:
  //
  // wholesaler
  //    ↓
  // products
  //    ↓
  // productName
  //    ↓
  // dailyPrice
  // -----------------------------------------

  const sellers = wholesalers
    .map((w) => {
      const entry = w.products.find(
        (p) => p.productName?.toLowerCase() === productName.toLowerCase(),
      );

      return {
        w,
        entry: {
          ...entry,
          wholesalePrice: finalProductData.wholesalePrice,
        },
      };
    })
    .filter((item) => item.entry !== undefined);

  console.log("Sellers for product:", sellers);

  return (
    <div className="container-app py-10">
      {/* Breadcrumb */}

      <div className="mb-6 text-sm text-muted">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        {" > "}
        <Link to="/products" className="hover:text-primary">
          Products
        </Link>{" "}
        {" > "}
        <span className="text-ink font-medium">
          {finalProductData.productName}
        </span>
      </div>

      {/* Product Header */}

      <div className="card p-6 flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            {finalProductData.productName}
          </h1>

          <p className="text-xs text-muted mt-1">Average Market Price Today</p>

          <p className="text-2xl font-extrabold text-primary mt-1">
            ₹{finalProductData.wholesalePrice.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-medium text-muted">1 Bag</span>
          </p>

          <p className="text-xs text-muted mt-1">
            Price updated: Today, 8:15AM
          </p>
        </div>

        <div className="w-24 h-24 rounded-2xl bg-primary-light flex items-center justify-center overflow-hidden">
          {finalProductData.imageUrl ? (
            <img
              src={finalProductData.imageUrl}
              alt={finalProductData.productName}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-5xl">🌾</span>
          )}
        </div>
      </div>

      {/* Wholesalers */}

      <h2 className="text-lg font-bold text-ink mb-4">
        Wholesalers Buying This Product
      </h2>

      <div className="space-y-3">
        {sellers.length === 0 ? (
          <div className="card p-4 text-sm text-muted">
            No wholesalers found for this product.
          </div>
        ) : (
          sellers.map(({ w, entry }) => (
            <div
              key={w.id}
              className="card p-4 flex items-center justify-between flex-wrap gap-3"
            >
              {/* Wholesaler information */}

              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-[10px] text-center leading-tight shrink-0"
                  style={randomColorStyle}
                >
                  {w.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-bold text-ink">{w.name}</p>

                  <p className="text-xs text-muted flex items-center gap-1">
                    <MapPin size={11} />

                    {w.block?.blockName ?? "N/A"}
                  </p>
                </div>
              </div>

              {/* Buying Quantity */}

              <div className="text-center">
                <p className="text-[11px] text-muted">Available Quantity</p>

                <p className="text-sm font-semibold text-ink">
                  {entry?.quantity ?? "N/A"}
                </p>
              </div>

              {/* Buying Price */}

              <div className="text-center">
                <p className="text-[11px] text-muted">Price (1 Bag)</p>

                <p className="text-sm font-semibold text-ink">
                  ₹{entry?.wholesalePrice ?? 0}
                </p>
              </div>

              {/* Buttons */}

              <div className="flex items-center gap-2">
                <Link to={`/wholesalers/${w.id}`}>
                  <Button variant="primary" size="sm">
                    View Profile
                  </Button>
                </Link>

                <a
                  href={`https://wa.me/${w.phone.replace(/\s|\+/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<MessageCircle size={14} />}
                  />
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Note */}

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
        Note: Prices and quantity may change. Please contact wholesaler for
        latest updates.
      </div>
    </div>
  );
}
