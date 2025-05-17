// ProductDetailsPage.jsx
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { useParams } from "react-router-dom";
import { productos } from "../../utils/productos";

export const ProductDetailsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { productName } = useParams();

  // Buscar el producto por nombre
  const product = productos.find(
    (p) => p.name.toLowerCase() === productName.toLowerCase()
  );

  if (!product) return <Typography>Producto no encontrado</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
            <Grid container>
              <Grid xs={12} md={6}>
                <CardMedia
                  component="img"
                  height="500"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "contain", p: 4 }}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <CardContent sx={{ p: 6, height: "100%" }}>
                  <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
                    {product.name}
                  </Typography>

                  <Chip
                    label={product.category}
                    color="primary"
                    sx={{ mb: 3, fontSize: "1rem", padding: "4px 12px" }}
                  />

                  <Typography variant="h4" color="primary" sx={{ mb: 4 }}>
                    ${product.price.toLocaleString("es-CO")}
                  </Typography>

                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth={isMobile}
                    sx={{ py: 2, fontSize: "1.1rem" }}
                  >
                    Añadir a la carrito
                  </Button>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
