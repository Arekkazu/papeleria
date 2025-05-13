import { useSearchParams } from "react-router-dom";
import { productos } from "../../utils/productos";
import { Box } from "@mui/material";
import { DiscoverCategory } from "../../components/common/categories/DiscoverCategory";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { ProductDetailView } from "../../components/common/products/ProductDetailView";
import { ProductNotFoundView } from "../../components/common/products/ProductNotFoundView";

function normalize(str) {
  return decodeURIComponent(str || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export const ProductsDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const normalizedName = normalize(name);
  const producto = productos.find(p => normalize(p.name) === normalizedName);

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
        <Box sx={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          pt: { xs: 6, md: 10 },
          px: { xs: 1, md: 4 },
        }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {producto ? (
              <ProductDetailView producto={producto} />
            ) : (
              <ProductNotFoundView />
            )}
          </Box>
          <Box sx={{ width: '100%' }}>
            <DiscoverCategory />
          </Box>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
