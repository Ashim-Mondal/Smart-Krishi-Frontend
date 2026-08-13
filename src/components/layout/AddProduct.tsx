import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import Button from "../../components/ui/Button";

import { addProduct, getProductCategories, getProductNames, type ProductCategoryMap } from "../../services/productListService";

// import {
//   getProductNames,
//   getProductCategories,
//   addProduct,
//   type ProductCategoryMap,
// } from "../../services/productService";

interface AddProductProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  block: {
    id: number;
    blockName: string;
  } | null;
}

export default function AddProduct({
  open,
  onClose,
  onSuccess,
}: AddProductProps) {
  // -----------------------------------------
  // Product data
  // -----------------------------------------

  const [productNames, setProductNames] = useState<string[]>([]);

  const [productCategories, setProductCategories] =
    useState<ProductCategoryMap>({});

  // -----------------------------------------
  // Form data
  // -----------------------------------------

  const [selectedProduct, setSelectedProduct] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");

  const [quantity, setQuantity] = useState("");

  // -----------------------------------------
  // Loading / messages
  // -----------------------------------------

  const [loading, setLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  // -----------------------------------------
  // Load product data
  // -----------------------------------------

  useEffect(() => {
    if (!open) {
      return;
    }

    const loadProductData = async () => {
      try {
        setLoading(true);
        setError("");

        // Both API calls happen only once
        const [names, categories] = await Promise.all([
          getProductNames(),
          getProductCategories(),
        ]);

        setProductNames(names);
        setProductCategories(categories);
      } catch (error) {
        console.error("Failed to load product data:", error);

        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProductData();
  }, [open]);

  // -----------------------------------------
  // Product change
  // -----------------------------------------

  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const product = e.target.value;

    setSelectedProduct(product);

    // Reset category when product changes
    setSelectedCategory("");
  };

  // -----------------------------------------
  // Quantity change
  // -----------------------------------------

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  // -----------------------------------------
  // Submit
  // -----------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------
    // Validation
    // -----------------------------------------

    if (!selectedProduct) {
      setError("Please select a product.");
      return;
    }

    if (!selectedCategory) {
      setError("Please select a category.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      setError("Please enter a valid quantity.");
      return;
    }

    // -----------------------------------------
    // Get logged-in seller
    // -----------------------------------------

    const storedUser = localStorage.getItem("kb_user");

    if (!storedUser) {
      setError("User information not found. Please login again.");

      return;
    }

    let user: User;

    try {
      user = JSON.parse(storedUser);
    } catch (error) {
      console.error("Error reading kb_user:", error);

      setError("Invalid user information. Please login again.");

      return;
    }

    if (!user.id) {
      setError("Seller ID not found. Please login again.");

      return;
    }

    // -----------------------------------------
    // Request body
    // -----------------------------------------

    const requestData = {
      productName: selectedProduct,

      category: selectedCategory,

      quantity: Number(quantity),

      sellerId: {
        id: user.id,
      },
    };

    console.log("Add Product Request:", requestData);

    // -----------------------------------------
    // Add product
    // -----------------------------------------

    try {
      setSubmitting(true);

      const response = await addProduct(requestData);

      console.log("Product created:", response);

      setSuccess("Product added successfully.");

      // -----------------------------------------
      // Reset form
      // -----------------------------------------

      setSelectedProduct("");
      setSelectedCategory("");
      setQuantity("");

      // -----------------------------------------
      // Tell Dashboard
      // -----------------------------------------

      onSuccess?.();

      // -----------------------------------------
      // Close modal
      // -----------------------------------------

      setTimeout(() => {
        onClose();
        setSuccess("");
      }, 800);
    } catch (error: any) {
      console.error("Add product error:", error);

      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to add product.";

      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  // -----------------------------------------
  // Close modal
  // -----------------------------------------

  const handleClose = () => {
    if (submitting) {
      return;
    }

    setSelectedProduct("");
    setSelectedCategory("");
    setQuantity("");

    setError("");
    setSuccess("");

    onClose();
  };

  // -----------------------------------------
  // Don't render
  // -----------------------------------------

  if (!open) {
    return null;
  }

  // -----------------------------------------
  // Get categories from frontend data
  // -----------------------------------------

  const availableCategories = selectedProduct
    ? productCategories[selectedProduct] || []
    : [];

  // -----------------------------------------
  // UI
  // -----------------------------------------

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      {/* Overlay */}

      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal */}

      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}

        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-extrabold text-ink">Add Product</h2>

            <p className="text-xs text-muted mt-1">
              Add a product to your selling list
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={22} className="animate-spin text-primary" />

            <span className="ml-2 text-sm text-muted">Loading products...</span>
          </div>
        )}

        {/* Error */}

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Success */}

        {success && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-200 p-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Form */}

        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Product */}

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Product Name
              </label>

              <select
                value={selectedProduct}
                onChange={handleProductChange}
                disabled={submitting}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
              >
                <option value="">Select product</option>

                {productNames.map((productName) => (
                  <option key={productName} value={productName}>
                    {productName}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                disabled={!selectedProduct || submitting}
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">
                  {selectedProduct ? "Select category" : "Select product first"}
                </option>

                {availableCategories.map((category: any) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}

            <div>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                disabled={submitting}
                placeholder="Enter quantity"
                className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-primary"
              />
            </div>

            {/* Buttons */}

            <div className="flex justify-end gap-2 pt-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClose}
                disabled={submitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={submitting}
              >
                {submitting ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
