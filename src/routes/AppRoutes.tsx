import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = lazy(() => import("../pages/Home/Home"));
const Login = lazy(() => import("../pages/Login/Login"));
const Signup = lazy(() => import("../pages/Signup/Signup"));
const Products = lazy(() => import("../pages/Products/Products"));
const ProductDetail = lazy(() => import("../pages/Products/ProductDetail"));
const Wholesalers = lazy(() => import("../pages/Wholesalers/Wholesalers"));
const WholesalerProfile = lazy(
  () => import("../pages/Profile/WholesalerProfile")
);
const About = lazy(() => import("../pages/About/About"));

const DashboardLayout = lazy(
  () => import("../pages/Dashboard/DashboardLayout")
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const MyProfile = lazy(() => import("../pages/Dashboard/MyProfile"));
const MyProducts = lazy(() => import("../pages/Dashboard/MyProducts"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/products" element={<Products />} />

          <Route
            path="/products/:product"
            element={<ProductDetail />}
          />

          <Route
            path="/wholesalers"
            element={<Wholesalers />}
          />

          <Route
            path="/wholesalers/:id"
            element={<WholesalerProfile />}
          />

          <Route path="/about" element={<About />} />

        </Route>


        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >

            <Route
              index
              element={<Dashboard />}
            />

            <Route
              path="profile"
              element={<MyProfile />}
            />

            <Route
              path="products"
              element={<MyProducts />}
            />

          </Route>

        </Route>

      </Routes>
    </Suspense>
  );
}