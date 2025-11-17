import { Container, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { DiscoverCategory } from "../../components/common/categories/DiscoverCategory";
import { ProductDetailView } from "../../components/common/products/ProductDetailView";
import { ProductNotFoundView } from "../../components/common/products/ProductNotFoundView";
import { useProducts } from "../../hooks/useProducts";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";

export const ProductDetailsPage = () => {
  const { productName } = useParams();
  const { products, loading, error } = useProducts();
  
  const product = products.find(
    (p) => p.name.toLowerCase() === productName?.toLowerCase()
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>

      <main style={{ flex: 1 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : product ? (
          <ProductDetailView producto={product} />
        ) : (
          <Container maxWidth="md" sx={{ py: 8 }}>
            <ProductNotFoundView />
          </Container>
        )}
      </main>

      <DiscoverCategory />

      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
