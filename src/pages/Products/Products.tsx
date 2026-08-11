import { Link } from "react-router-dom";
import SectionTitle from "../../components/ui/SectionTitle";
import { useAppContext } from "../../context/AppContext";
import type { DailyMarketPrice } from "../../types";

export default function Products() {
  const {
    productNames,
    productList,
    marketPricesLoading,
    marketPricesError,
    dailyMarketPricesOriginal,
  } = useAppContext();

  // console.log("Product Names:", productNames);
  // console.log("Product List:", productList);
  // console.log("Original Market Prices:", dailyMarketPricesOriginal);

  if (marketPricesLoading) {
    return <div>Loading products...</div>;
  }

  if (marketPricesError) {
    return <div>{marketPricesError}</div>;
  }

  return (
    <>
      <div className="container-app py-10">
        <SectionTitle title="Products" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {productNames.map((productName) => {
            // 1. Find product from ProductList
            const productData = productList.find(
              (product) =>
                product.productName.toLowerCase() === productName.toLowerCase(),
            );

            // console.log("Product Data for", productName, ":", productData);

            if (!productData) {
              return null;
            }

            // 2. Get product ID
            const productId = productData.id;

            // 3. Find daily market price using product ID
            const dailyPriceData: DailyMarketPrice[] = [];

            dailyMarketPricesOriginal.forEach((product) => {
              if (product.productId === productId) {
                dailyPriceData.push(product);
              }
            });

            // console.log(
            //   "Daily Price Data for",
            //   productName,
            //   ":",
            //   dailyPriceData,
            // );

            const finalProductData = {
              productName: productName,
              productId: dailyPriceData[0]?.productId ?? productId,
              quantity: productData.quantity,
              wholesalePrice: dailyPriceData[0]?.wholesalePrice ?? 0,
              imageUrl: productData.productImageId.imageUrl,
            };

            // console.log("Final Product Data:", finalProductData);

            // 6. Create URL slug
            const slug = productName.toLowerCase().replace(/\s+/g, "-");

            // 7. Render
            return (
              <Link
                key={productId}
                to={`/products/${slug}`}
                className="card p-5 flex flex-col items-center gap-3 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Product Image */}
                <div className="rounded-2xl w-24 h-24 flex items-center justify-center overflow-hidden">
                  <img
                    src={finalProductData.imageUrl}
                    alt={finalProductData.productName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Name */}
                <div className="font-semibold">
                  {finalProductData.productName}
                </div>

                {/* Price + Quantity */}
                <div>
                  ₹{finalProductData.wholesalePrice.toLocaleString("en-IN")} / 1
                  Bag
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
