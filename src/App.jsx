import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "@mui/material";
import { MainPage } from "../src/pages/MainPage/MainPage";
import { AboutUsPage } from "../src/pages/AboutUs/AboutUsPage";
import { ProductListPage } from "../src/pages/Products/ProductsListPage";
import { ProductDetailsPage } from "../src/pages/Products/ProductDetails";
import { CarPage } from "../src/pages/Car/CarPage";
import { LoginPage } from "../src/pages/Login/LoginPage";

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

        {/* Rutas para las paginas */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route
            path="/products/:productName"
            element={<ProductDetailsPage />}
          />
          <Route path="/cart" element={<CarPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

      {/* <AboutUsPage /> */}
      {/* <ProductsListPage /> */}
      {/* <ProductsDetailsPage /> */}
      {/* <CarPage /> */}
      {/* <RegisterPage /> */}
    </>
  );
}

export default App;
