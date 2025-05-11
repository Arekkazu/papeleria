import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { Box } from "@mui/material";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
export const ProductsListPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>
          <Navbar />
        </NavBox>
      </header>
      <main>
        <h1>Aqui ya iria el componente de productos</h1>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
