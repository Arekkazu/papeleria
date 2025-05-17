import { useState } from "react"; // Añadir este import
import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  MenuItem,
  useTheme,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Search, Tune } from "@mui/icons-material";
import { productos } from "../../utils/productos";
import { Link } from "react-router-dom";

export const ProductListPage = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filtrar productos
  const filteredProducts = productos.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  // Extraer categorías únicas
  const categories = [...new Set(productos.map((p) => p.category))];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flex: 1 }}>
        <Container maxWidth="lg" sx={{ py: 6 }}>
          {/* Sección de Filtros */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 4 }}>
              Nuestros Productos
            </Typography>

            <Grid container spacing={3}>
              <Grid xs={12} md={4}>
                <TextField
                  fullWidth
                  placeholder="Buscar producto..."
                  variant="outlined"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Categoría"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Tune />
                      </InputAdornment>
                    ),
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

          {/* Listado de Productos */}
          <Grid container spacing={4}>
            {filteredProducts.length === 0 ? (
              <Grid xs={12}>
                <Typography variant="h5" textAlign="center" sx={{ py: 4 }}>
                  No se encontraron productos
                </Typography>
              </Grid>
            ) : (
              filteredProducts.map((product) => (
                <Grid xs={12} sm={6} md={4} key={product.name}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      boxShadow: 3,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    {/* ... (mantener igual el contenido de la tarjeta) ... */}
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.image}
                      alt={product.name}
                      sx={{
                        objectFit: "contain",
                        p: 2,
                        maxHeight: 240,
                        width: "auto",
                        mx: "auto",
                      }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          gutterBottom
                          component={Link}
                          to={`/products/${encodeURIComponent(product.name)}`}
                          sx={{
                            textDecoration: "none",
                            color: "inherit",
                            "&:hover": { color: theme.palette.primary.main },
                            minHeight: "64px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Chip
                          label={product.category}
                          color="primary"
                          size="small"
                          sx={{ mb: 2 }}
                        />

                        <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                          ${product.price.toLocaleString("es-CO")}
                        </Typography>
                      </Box>

                      <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          fullWidth
                          component={Link}
                          to={`/products/${encodeURIComponent(product.name)}`}
                        >
                          Ver Detalles
                        </Button>
                        <Button variant="contained" color="primary" fullWidth>
                          Añadir
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
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
