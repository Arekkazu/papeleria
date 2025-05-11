import { Box, Typography, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { productos } from "../../../utils/productos";

const featuredProducts = productos.slice(0, 8);

export const FeaturedProductsGrid = () => (
  <Box sx={{ my: 6 }}>
    <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
      Productos destacados
    </Typography>
    <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
      Descubre los productos más populares y recomendados para ti
    </Typography>
    <Grid container spacing={3} justifyContent="center">
      {featuredProducts.map((product, idx) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id || idx}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  </Box>
); 