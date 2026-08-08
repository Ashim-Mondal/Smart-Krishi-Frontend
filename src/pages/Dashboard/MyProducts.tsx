import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  PackageOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import api from "../../services/api";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  createdAt?: string;
}

export default function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load products from backend
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get("/products/all");

      setProducts(response.data);

    } catch (error) {
      console.error("Error loading products:", error);

      // If there are no products / endpoint returns error,
      // keep the product list empty.
      setProducts([]);

    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/products/delete/${id}`);

      // Remove deleted product from screen
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully");

    } catch (error) {
      console.error("Delete product error:", error);
      alert("Unable to delete product");
    }
  };

  // Edit product
  const handleEdit = (id: number) => {
    navigate(`/dashboard/products/edit/${id}`);
  };

  return (
    <div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">

        <h1 className="text-xl font-extrabold text-ink">
          My Products
        </h1>

        <Button
          size="sm"
          icon={<Plus size={14} />}
          onClick={() => navigate("/dashboard/products/add")}
        >
          Add Product
        </Button>

      </div>


      {/* Product Card */}
      <div className="card p-5">

        {/* Loading */}
        {loading && (
          <div className="py-12 text-center">
            <p className="text-sm text-muted">
              Loading products...
            </p>
          </div>
        )}


        {/* No Products */}
        {!loading && products.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center text-center">

            <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <PackageOpen
                size={30}
                className="text-primary"
              />
            </div>

            <h2 className="text-lg font-bold text-ink">
              No Products Yet
            </h2>

            <p className="text-sm text-muted mt-2 max-w-sm">
              You haven't added any products yet.
              Add your first product to start selling on KrishiBlock.
            </p>

            <Button
              size="sm"
              icon={<Plus size={14} />}
              className="mt-5"
              onClick={() =>
                navigate("/dashboard/products/add")
              }
            >
              Add Your First Product
            </Button>

          </div>
        )}


        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-muted border-b border-border">

                  <th className="pb-3 font-medium">
                    Product
                  </th>

                  <th className="pb-3 font-medium">
                    Quantity
                  </th>

                  <th className="pb-3 font-medium">
                    Price (Per 100)
                  </th>

                  <th className="pb-3 font-medium">
                    Last Updated
                  </th>

                  <th className="pb-3 font-medium">
                    Status
                  </th>

                  <th className="pb-3 font-medium">
                    Action
                  </th>

                </tr>
              </thead>


              <tbody>

                {products.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b border-border last:border-0"
                  >

                    {/* Product */}
                    <td className="py-3 font-medium text-ink">
                      {product.name}
                    </td>


                    {/* Quantity */}
                    <td className="py-3 text-ink">
                      {product.quantity}
                    </td>


                    {/* Price */}
                    <td className="py-3 text-ink">
                      ₹{product.price.toLocaleString("en-IN")}
                    </td>


                    {/* Date */}
                    <td className="py-3 text-muted">
                      {product.createdAt
                        ? new Date(
                            product.createdAt
                          ).toLocaleDateString("en-IN")
                        : "Today"}
                    </td>


                    {/* Status */}
                    <td className="py-3">

                      <span className="text-xs font-semibold text-success bg-green-50 px-2 py-1 rounded-full">
                        Active
                      </span>

                    </td>


                    {/* Actions */}
                    <td className="py-3">

                      <button
                        onClick={() =>
                          handleEdit(product.id)
                        }
                        className="text-primary hover:text-primary-dark mr-3"
                        title="Edit"
                      >
                        <Pencil size={15} />
                      </button>


                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="text-danger hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={15} />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}