import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { MainPage } from "./pages/MainPage/MainPage";
import { AboutUsPage } from "./pages/AboutUs/AboutUsPage";
import { ProductListPage } from "./pages/Products/ProductsListPage"; // usar alias si hay conflicto de nombres
import { ProductDetailsPage} from "./pages/Products/ProductDetails";
import { CarPage } from "./pages/Car/CarPage";
import { LoginPage } from "./pages/Login/LoginPage";
import {ApiPage} from "./pages/ApiPage/ApiPage";

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
          <Route path="/api" element={<ApiPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
