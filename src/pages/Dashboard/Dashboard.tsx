import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Plus,
  Bell,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

import Button from "../../components/ui/Button";
import EditProfile from "./EditProfile";
import { useDisclosure } from "../../hooks/useDisclosure";
import AddProduct from "../../components/layout/AddProduct";
import { useAppContext } from "../../context/AppContext";

interface Block {
  id: number;
  blockName: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  block: Block | null;
  createdAt?: string;
}

const notifIcon = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
};

export default function Dashboard() {
  const editPanel = useDisclosure();
  const addProductPanel = useDisclosure();

  const [user, setUser] = useState<User | null>(null);

  const {
    wholesalers,
    refreshMarketPrices,
    marketPricesLoading,
    marketPricesError,
  } = useAppContext();

  // -----------------------------------------
  // Get logged-in user from localStorage
  // -----------------------------------------

  useEffect(() => {
    const storedUser = localStorage.getItem("kb_user");

    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);

        setUser(parsedUser);
      } catch (error) {
        console.error(
          "Error reading logged-in user:",
          error,
        );
      }
    }
  }, []);

  // -----------------------------------------
  // Refresh products after Dashboard loads
  // -----------------------------------------

  useEffect(() => {
    refreshMarketPrices();
  }, []);

  // -----------------------------------------
  // Find logged-in wholesaler
  // -----------------------------------------

  const currentWholesaler = useMemo(() => {
    if (!user?.id) {
      return undefined;
    }

    return wholesalers.find(
      (wholesaler) =>
        String(wholesaler.id) === String(user.id),
    );
  }, [wholesalers, user]);

  // -----------------------------------------
  // Products belonging to logged-in user
  //
  // ProductList + DailyMarketPrice are already
  // combined inside AppContext.
  // -----------------------------------------

  const myProducts = currentWholesaler?.products ?? [];

  console.log(
    "Logged-in User:",
    user,
  );

  console.log(
    "Current Wholesaler:",
    currentWholesaler,
  );

  console.log(
    "My Products:",
    myProducts,
  );

  // -----------------------------------------
  // Temporary notifications
  // -----------------------------------------

  const notifications = [
    {
      id: 1,
      type: "info" as keyof typeof notifIcon,
      title: "Welcome to SmartKrishi",
      time: "Just now",
    },
    {
      id: 2,
      type: "success" as keyof typeof notifIcon,
      title: "Your account has been created successfully",
      time: "Today",
    },
  ];

  return (
    <div>
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-ink">
            Welcome, {user?.name || "User"}
          </h1>

          <p className="text-sm text-muted mt-1">
            Manage your SmartKrishi account
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={<Pencil size={14} />}
          onClick={editPanel.open}
        >
          Edit Profile
        </Button>
      </div>

      {/* ================= USER INFORMATION ================= */}

      <div className="card p-5 mb-6">
        <h2 className="text-sm font-bold text-ink mb-4">
          My Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Name */}

          <div>
            <p className="text-xs text-muted mb-1">
              Name
            </p>

            <p className="font-semibold text-ink">
              {user?.name || "-"}
            </p>
          </div>

          {/* Email */}

          <div>
            <p className="text-xs text-muted mb-1">
              Email
            </p>

            <p className="font-semibold text-ink">
              {user?.email || "-"}
            </p>
          </div>

          {/* Phone */}

          <div>
            <p className="text-xs text-muted mb-1">
              Phone
            </p>

            <p className="font-semibold text-ink">
              {user?.phone || "-"}
            </p>
          </div>

          {/* Block */}

          <div>
            <p className="text-xs text-muted mb-1">
              Block
            </p>

            <p className="font-semibold text-ink">
              {user?.block?.blockName || "-"}
            </p>
          </div>
        </div>

        {/* Role */}

        <div className="mt-5">
          <p className="text-xs text-muted mb-1">
            User Type
          </p>

          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold capitalize">
            {user?.role || "-"}
          </span>
        </div>
      </div>

      {/* ================= STATISTICS ================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card p-5 text-center">
          <p className="text-sm text-muted">
            Profile Views
          </p>

          <p className="text-3xl font-extrabold text-ink mt-2">
            0
          </p>

          <p className="text-xs text-muted mt-1">
            Today
          </p>
        </div>

        <div className="card p-5 text-center">
          <p className="text-sm text-muted">
            Phone Clicks
          </p>

          <p className="text-3xl font-extrabold text-ink mt-2">
            0
          </p>

          <p className="text-xs text-muted mt-1">
            Today
          </p>
        </div>

        <div className="card p-5 text-center">
          <p className="text-sm text-muted">
            WhatsApp Clicks
          </p>

          <p className="text-3xl font-extrabold text-ink mt-2">
            0
          </p>

          <p className="text-xs text-muted mt-1">
            Today
          </p>
        </div>

        <div className="card p-5 text-center">
          <p className="text-sm text-muted">
            Total Inquiries
          </p>

          <p className="text-3xl font-extrabold text-ink mt-2">
            0
          </p>

          <p className="text-xs text-muted mt-1">
            This Month
          </p>
        </div>
      </div>

      {/* ================= PRODUCTS + NOTIFICATIONS ================= */}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ================= PRODUCTS ================= */}

        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-ink">
              Your Products
            </h2>

            <Button
              size="sm"
              icon={<Plus size={14} />}
              onClick={addProductPanel.open}
            >
              Add Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted border-b border-border">
                  <th className="pb-2 font-medium">
                    Product
                  </th>

                  <th className="pb-2 font-medium">
                    Quantity
                  </th>

                  <th className="pb-2 font-medium">
                    Price
                  </th>

                  {/* <th className="pb-2 font-medium">
                    Last Updated
                  </th> */}

                  <th className="pb-2 font-medium">
                    Status
                  </th>

                  <th className="pb-2 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Loading */}

                {marketPricesLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-muted"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : marketPricesError ? (
                  /* Error */

                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-red-500"
                    >
                      {marketPricesError}
                    </td>
                  </tr>
                ) : myProducts.length === 0 ? (
                  /* No Products */

                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-10 text-muted"
                    >
                      <div className="flex flex-col items-center">
                        <div className="text-3xl mb-2">
                          📦
                        </div>

                        <p className="font-medium text-ink">
                          No products added yet
                        </p>

                        <p className="text-xs mt-1">
                          Click "Add Product" to add
                          your first product.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  /* Products */

                  myProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border last:border-0"
                    >
                      {/* Product */}

                      <td className="py-4">
                        <p className="font-semibold text-ink">
                          {product.productName}
                        </p>

                        <p className="text-xs text-muted">
                          {product.category || "-"}
                        </p>
                      </td>

                      {/* Quantity */}

                      <td className="py-4">
                        <span className="font-medium text-ink">
                          {product.quantity}
                        </span>
                      </td>

                      {/* Price */}

                      <td className="py-4">
                        <span className="font-semibold text-primary">
                          ₹
                          {product.dailyPrice?.wholesalePrice?.toLocaleString(
                            "en-IN",
                          ) ?? "0"}
                        </span>
                      </td>

                      {/* Last Updated */}
{/* 
                      <td className="py-4 text-xs text-muted">
                        {product.dailyPrice?.updatedAt
                          ? new Date(
                              product.dailyPrice.updatedAt,
                            ).toLocaleDateString(
                              "en-IN",
                            )
                          : "N/A"}
                      </td> */}

                      {/* Status */}

                      <td className="py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            product.status
                              ?.toLowerCase() ===
                            "verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {product.status || "Pending"}
                        </span>
                      </td>

                      {/* Action */}

                      <td className="py-4">
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= NOTIFICATIONS ================= */}

        <div className="card p-5">
          <h2 className="text-sm font-bold text-ink mb-4 flex items-center gap-2">
            <Bell
              size={15}
              className="text-primary"
            />

            Notifications
          </h2>

          <div className="space-y-4">
            {notifications.map((notification) => {
              const Icon =
                notifIcon[notification.type];

              return (
                <div
                  key={notification.id}
                  className="flex items-start gap-2.5 text-sm"
                >
                  <Icon
                    size={15}
                    className="text-primary mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-ink leading-snug">
                      {notification.title}
                    </p>

                    <p className="text-[11px] text-muted">
                      {notification.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= EDIT PROFILE ================= */}

      <EditProfile
        open={editPanel.isOpen}
        onClose={editPanel.close}
      />

      {/* ================= ADD PRODUCT ================= */}

      <AddProduct
        open={addProductPanel.isOpen}
        onClose={addProductPanel.close}
      />
    </div>
  );
}