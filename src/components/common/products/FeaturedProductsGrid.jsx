import { Box, Typography, Grid } from "@mui/material";
import { ProductCard } from "./ProductCard";
import { productos } from "../../../utils/productos";
import { useNavigate } from "react-router-dom";

export const FeaturedProductsGrid = () => {
  const navigate = useNavigate();
  const featuredProducts = productos.filter((p) => p.featured).slice(0, 8);

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
        {featuredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.name}>
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
