import { Box, Typography, Grid, CircularProgress, Alert } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { useProducts } from "../../../hooks/useProducts";
import { useNavigate } from "react-router-dom";

export const FeaturedProductsGrid = () => {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  
  // Tomar los primeros 8 productos como destacados
  const featuredProducts = products.slice(0, 8);

  if (loading) {
    return (
      <Box sx={{ my: 6, px: { xs: 2, md: 4 }, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ my: 6, px: { xs: 2, md: 4 } }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 6, px: { xs: 2, md: 4 } }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={700}>
        Productos destacados
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Descubre los productos más populares
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {featuredProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id || product.name + index}>
            <ProductCard
              product={product}
              onView={() =>
                navigate(`/products/${encodeURIComponent(product.name)}`)
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
