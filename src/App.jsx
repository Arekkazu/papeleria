import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { MainPage } from "./pages/MainPage/MainPage";
import { AboutUsPage } from "./pages/AboutUs/AboutUsPage";
import { ProductListPage } from "./pages/Products/ProductsListPage";
import { ProductDetailsPage } from "./pages/Products/ProductDetails";
import { CarPage } from "./pages/Car/CarPage";
import { LoginPage } from "./pages/Login/LoginPage";
import { RegisterPage } from "./pages/Register/Register";
import { ApiPage } from "./pages/ApiPage/ApiPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminLayout } from "./components/AdminLayout";
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import { AdminUsers } from "./pages/Admin/AdminUsers";
import { AdminProducts } from "./pages/Admin/AdminProducts";
import { AdminCategories } from "./pages/Admin/AdminCategories";
import { AdminSuppliers } from "./pages/Admin/AdminSuppliers";

function App() {
  return (
    <>
      <BrowserRouter>
        <GlobalStyles
          styles={{
            "*": { margin: 0, padding: 0, boxSizing: "border-box" },
            body: {
              fontFamily: "Inter, Roboto, 'Helvetica Neue', Arial, sans-serif",
              backgroundColor: "#f5f8fa",
              color: "#222",
            },
            main: { flexGrow: 1 },
          }}
        />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/product" element={<ProductDetailsPage />} />
          <Route path="/products/:productName" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CarPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/api" element={<ApiPage />} />

          {/* Rutas de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="suppliers" element={<AdminSuppliers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
