// import { useState } from "react";
import { GlobalStyles } from "@mui/material";
import { MainPage } from "./pages/MainPage/MainPage";
import { AboutUsPage } from "./pages/AboutUs/AboutUsPage";
import { ProductsListPage } from "./pages/Products/ProductsListPage";
import { ProductsDetailsPage } from "./pages/Products/ProductDetails";
import { CarPage } from "./pages/Car/CarPage";
import { RegisterPage } from "./pages/Register/Register";
function App() {
  return (
    <>
      <GlobalStyles
        styles={{
          "*": {
            margin: 0,
            padding: 0,
          },
          body: {
            fontFamily: "Roboto, sans-serif",
            backgroundColor: "#f5f5f5",
          },
          main: {
            flexGrow: 1,
          },
        }}
      />
      <MainPage />
      {/* <AboutUsPage /> */}
      {/* <ProductsListPage /> */}
      {/* <ProductsDetailsPage /> */}
      {/* <CarPage />
       */}
      {/* <RegisterPage /> */}
    </>
  );
}

export default App;
