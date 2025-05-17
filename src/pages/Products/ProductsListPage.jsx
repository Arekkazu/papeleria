import { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Container,
  TextField,
  InputAdornment,
  MenuItem,
  useTheme,
} from "@mui/material";
import { ProductCard } from "../../components/common/products/ProductCard";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Search, Tune } from "@mui/icons-material";
import { productos } from "../../utils/productos";

export const ProductListPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredProducts = productos.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(productos.map((p) => p.category))];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 4 }}>
              Catálogo Completo
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Categoría"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  InputProps={{
                    startAdornment: <Tune />,
                  }}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Grid container spacing={4}>
            {filteredProducts.length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center" sx={{ py: 4 }}>
                  No se encontraron productos
                </Typography>
              </Grid>
            ) : (
              filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.name}>
                  <ProductCard product={product} />
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
