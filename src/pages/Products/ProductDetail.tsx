import { Link, useParams } from "react-router-dom";
import { MapPin, MessageCircle } from "lucide-react";
import Button from "../../components/ui/Button";
import { useAppContext } from "../../context/AppContext";
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
  // 1. Find current product name from URL
  // -----------------------------------------

  const productName = productNames.find(
    (name) => name.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  if (!productName) {
    return <div>Product not found.</div>;
  }

  // -----------------------------------------
  // 2. Find product from ProductList
  // -----------------------------------------

  const productData = productList.find(
    (product) =>
      product.productName?.toLowerCase() === productName.toLowerCase(),
  );

  if (!productData) {
    return <div>Product data not found.</div>;
  }

  // -----------------------------------------
  // 3. Find market price
  // -----------------------------------------

  const marketPrice = dailyMarketPricesOriginal.find(
    (price) => String(price.productId) === String(productData.id),
  );

  // -----------------------------------------
  // 4. Create ONE seller data array
  // -----------------------------------------

  const sellerData = wholesalers
    .map((wholesaler) => {
      const product = wholesaler.products.find(
        (item) => item.productName?.toLowerCase() === productName.toLowerCase(),
      );

      // This wholesaler does not sell this product
      if (!product) {
        return null;
      }

      return {
        productName: productName,

        productId: marketPrice?.productId ?? productData.id,

        imageUrl: productData.productImageId?.imageUrl ?? "",

        marketPrice: marketPrice?.wholesalePrice ?? 0,

        quantity: product.quantity,

        wholesalePrice: marketPrice?.wholesalePrice ?? 0,

        wholesaler: {
          id: wholesaler.id,
          name: wholesaler.name,
          phone: wholesaler.phone,
          blockName: wholesaler.block?.blockName ?? "N/A",
        },
      };
    })
    .filter((seller): seller is NonNullable<typeof seller> => seller !== null);

  console.log("Product Name:", productName);
  console.log("Product Data:", productData);
  console.log("Seller Data:", sellerData);

  // -----------------------------------------
  // Product information
  // -----------------------------------------

  const product = {
    productName,
    productId: marketPrice?.productId ?? productData.id,
    imageUrl: productData.productImageId?.imageUrl ?? "",
    marketPrice: marketPrice?.wholesalePrice ?? 0,
  };

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
        <span className="text-ink font-medium">{product.productName}</span>
      </div>

      {/* Product Header */}

      <div className="card p-6 flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">
            {product.productName}
          </h1>

          <p className="text-xs text-muted mt-1">Average Market Price Today</p>

          <p className="text-2xl font-extrabold text-primary mt-1">
            ₹{product.marketPrice.toLocaleString("en-IN")}{" "}
            <span className="text-sm font-medium text-muted">1 Bag</span>
          </p>

          <p className="text-xs text-muted mt-1">
            Price updated: Today, 8:15AM
          </p>
        </div>

        <div className="w-24 h-24 rounded-2xl bg-primary-light flex items-center justify-center overflow-hidden">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.productName}
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
        {sellerData.length === 0 ? (
          <div className="card p-4 text-sm text-muted">
            No wholesalers found for this product.
          </div>
        ) : (
          sellerData.map((seller) => (
            <div
              key={seller.wholesaler.id}
              className="card p-4 flex items-center justify-between flex-wrap gap-3"
            >
              {/* Wholesaler */}

              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-[10px] text-center leading-tight shrink-0"
                  style={randomColorStyle}
                >
                  {seller.wholesaler.name.slice(0, 2).toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-bold text-ink">
                    {seller.wholesaler.name}
                  </p>

                  <p className="text-xs text-muted flex items-center gap-1">
                    <MapPin size={11} />

                    {seller.wholesaler.blockName}
                  </p>
                </div>
              </div>

              {/* Available Quantity */}

              <div className="text-center">
                <p className="text-[11px] text-muted">Available Quantity</p>

                <p className="text-sm font-semibold text-ink">
                  {seller.quantity ?? "N/A"}
                </p>
              </div>

              {/* Price */}

              <div className="text-center">
                <p className="text-[11px] text-muted">Price (1 Bag)</p>

                <p className="text-sm font-semibold text-ink">
                  ₹{seller.wholesalePrice}
                </p>
              </div>

              {/* Buttons */}

              <div className="flex items-center gap-2">
                <Link to={`/wholesalers/${seller.wholesaler.id}`}>
                  <Button variant="primary" size="sm">
                    View Profile
                  </Button>
                </Link>

                {/* <a
                  href={`https://wa.me/${seller.wholesaler.phone.replace(
                    /\s|\+/g,
                    "",
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<MessageCircle size={14} />}
                  />
                </a> */}
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
