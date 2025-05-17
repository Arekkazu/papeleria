import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { ProductDetailView } from "../../components/common/products/ProductDetailView";
import { ProductNotFoundView } from "../../components/common/products/ProductNotFoundView";
import { productos } from "../../utils/productos";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";

export const ProductDetailsPage = () => {
  const { productName } = useParams();
  const product = productos.find(
    (p) => p.name.toLowerCase() === productName?.toLowerCase()
  );

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>

      <main style={{ flex: 1 }}>
        {product ? (
          <ProductDetailView producto={product} />
        ) : (
          <Container maxWidth="md" sx={{ py: 8 }}>
            <ProductNotFoundView />
          </Container>
        )}
      </main>

      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
