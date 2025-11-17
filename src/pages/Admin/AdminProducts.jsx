import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputAdornment,
  MenuItem,
  FormHelperText,
  Link,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import { adminService } from "../../services/api";

export const AdminProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [error, setError] = useState(null);
  const [categoryError, setCategoryError] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState({ min: "", max: "" });
  const [stockFilter, setStockFilter] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    productId: null,
    productName: "",
  });
  const [editDialog, setEditDialog] = useState({ open: false, product: null });
  const [createDialog, setCreateDialog] = useState({ open: false });
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryName: "",
    image: "",
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [page, rowsPerPage, search, categoryFilter, stockFilter, priceFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getProductsAdmin(
        page + 1,
        rowsPerPage,
        categoryFilter,
        search,
      );
      if (response.success) {
        let filteredProducts = response.products;

        // Filtrar por precio si está definido
        if (priceFilter.min !== "" || priceFilter.max !== "") {
          filteredProducts = filteredProducts.filter((product) => {
            const price = product.price;
            const min =
              priceFilter.min === "" ? 0 : parseFloat(priceFilter.min);
            const max =
              priceFilter.max === "" ? Infinity : parseFloat(priceFilter.max);
            return price >= min && price <= max;
          });
        }

        // Filtrar por stock
        if (stockFilter) {
          filteredProducts = filteredProducts.filter((product) => {
            const stock = product.stock || 0;
            if (stockFilter === "sin-stock") return stock === 0;
            if (stockFilter === "bajo-stock") return stock > 0 && stock <= 10;
            if (stockFilter === "con-stock") return stock > 10;
            return true;
          });
        }

        setProducts(filteredProducts);
        setTotalProducts(filteredProducts.length);
      }
    } catch (err) {
      console.error("Error al cargar productos:", err);
      setError(err.message || "Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await adminService.getCategoriesAdmin(1, 100, "");
      if (response.success) {
        setCategories(response.categories || []);
      }
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const validateCategory = (categoryName) => {
    if (!categoryName) {
      setCategoryError("La categoría es requerida");
      return false;
    }

    const categoryExists = categories.some(
      (cat) => cat.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (!categoryExists) {
      setCategoryError("Esta categoría no existe. Por favor, créala primero.");
      return false;
    }

    setCategoryError("");
    return true;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
    setPage(0);
  };

  const handleStockFilterChange = (event) => {
    setStockFilter(event.target.value);
    setPage(0);
  };

  const handlePriceFilterChange = (field, value) => {
    setPriceFilter((prev) => ({ ...prev, [field]: value }));
    setPage(0);
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategoryFilter("");
    setStockFilter("");
    setPriceFilter({ min: "", max: "" });
    setPage(0);
  };

  const hasActiveFilters =
    search ||
    categoryFilter ||
    stockFilter ||
    priceFilter.min ||
    priceFilter.max;

  const handleDeleteClick = (productId, productName) => {
    setDeleteDialog({ open: true, productId, productName });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await adminService.deleteProduct(deleteDialog.productId);
      if (response.success) {
        loadProducts();
        setDeleteDialog({ open: false, productId: null, productName: "" });
      }
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setError(err.message || "Error al eliminar producto");
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock,
      categoryName: product.categoryName || product.category?.name || "",
      image: product.image || "",
    });
    setCategoryError("");
    setEditDialog({ open: true, product });
  };

  const handleCreateClick = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryName: "",
      image: "",
    });
    setCategoryError("");
    setCreateDialog({ open: true });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validar categoría cuando cambia
    if (name === "categoryName") {
      validateCategory(value);
    }
  };

  const handleCreateSubmit = async () => {
    // Validar categoría antes de enviar
    if (!validateCategory(formData.categoryName)) {
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      const response = await adminService.createProduct(productData);
      if (response.success) {
        loadProducts();
        setCreateDialog({ open: false });
        setCategoryError("");
      }
    } catch (err) {
      console.error("Error al crear producto:", err);
      setError(err.message || "Error al crear producto");
    }
  };

  const handleEditSubmit = async () => {
    // Validar categoría antes de enviar
    if (!validateCategory(formData.categoryName)) {
      return;
    }

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      const response = await adminService.updateProduct(
        editDialog.product._id,
        productData,
      );
      if (response.success) {
        loadProducts();
        setEditDialog({ open: false, product: null });
        setCategoryError("");
      }
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      setError(err.message || "Error al actualizar producto");
    }
  };

  const handleGoToCategories = () => {
    navigate("/admin/categories");
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress sx={{ color: "#2697a6" }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          sx={{
            bgcolor: "#2697a6",
            "&:hover": { bgcolor: "#1f7a86" },
          }}
        >
          Nuevo Producto
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 3, mt: 3 }}>
        {/* Barra de búsqueda y filtros */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Búsqueda por nombre */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar productos por nombre..."
              value={search}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Filtro por categoría */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Categoría"
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              disabled={loadingCategories}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CategoryIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="">Todas las categorías</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category._id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Filtro por stock */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Estado de Stock"
              value={stockFilter}
              onChange={handleStockFilterChange}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="sin-stock">Sin Stock (0)</MenuItem>
              <MenuItem value="bajo-stock">Bajo Stock (≤10)</MenuItem>
              <MenuItem value="con-stock">Con Stock (&gt;10)</MenuItem>
            </TextField>
          </Grid>

          {/* Filtro por precio mínimo */}
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              fullWidth
              label="Precio Min"
              type="number"
              value={priceFilter.min}
              onChange={(e) => handlePriceFilterChange("min", e.target.value)}
              placeholder="$ 0"
              inputProps={{ min: 0, step: 100 }}
            />
          </Grid>

          {/* Filtro por precio máximo */}
          <Grid item xs={6} sm={3} md={2}>
            <TextField
              fullWidth
              label="Precio Max"
              type="number"
              value={priceFilter.max}
              onChange={(e) => handlePriceFilterChange("max", e.target.value)}
              placeholder="$ ∞"
              inputProps={{ min: 0, step: 100 }}
            />
          </Grid>

          {/* Botón para limpiar filtros */}
          {hasActiveFilters && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                sx={{
                  color: "#2697a6",
                  borderColor: "#2697a6",
                  "&:hover": {
                    borderColor: "#1f7a86",
                    bgcolor: "rgba(38, 151, 166, 0.04)",
                  },
                }}
              >
                Limpiar Filtros
              </Button>
            </Grid>
          )}
        </Grid>

        {/* Tabla de productos */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id} hover>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    {product.categoryName || product.category?.name || "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    ${product.price.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        color:
                          product.stock === 0
                            ? "#ea4335"
                            : product.stock <= 10
                              ? "#fbbc04"
                              : "#34a853",
                        fontWeight: product.stock <= 10 ? 600 : 400,
                      }}
                    >
                      {product.stock}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(product)}
                      sx={{ color: "#2697a6", mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() =>
                        handleDeleteClick(product._id, product.name)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          component="div"
          count={totalProducts}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>

      {/* Dialog de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={() =>
          setDeleteDialog({ open: false, productId: null, productName: "" })
        }
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <strong>{deleteDialog.productName}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({ open: false, productId: null, productName: "" })
            }
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              bgcolor: "#ea4335",
              color: "white",
              "&:hover": { bgcolor: "#c5221f" },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de creación */}
      <Dialog
        open={createDialog.open}
        onClose={() => setCreateDialog({ open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Crear Nuevo Producto</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Categoría"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleFormChange}
                required
                error={!!categoryError}
                disabled={loadingCategories}
                helperText={
                  loadingCategories
                    ? "Cargando categorías..."
                    : categoryError || "Selecciona una categoría existente"
                }
              >
                <MenuItem value="">
                  <em>Seleccionar categoría</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              {categoryError && (
                <Box
                  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CategoryIcon sx={{ color: "#2697a6", fontSize: 18 }} />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleGoToCategories}
                    sx={{
                      color: "#2697a6",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Ir a crear categorías
                  </Link>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de Imagen"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialog({ open: false })}>
            Cancelar
          </Button>
          <Button
            onClick={handleCreateSubmit}
            disabled={!!categoryError || !formData.categoryName}
            sx={{
              bgcolor: "#2697a6",
              color: "white",
              "&:hover": { bgcolor: "#1f7a86" },
              "&:disabled": { bgcolor: "#ccc", color: "#666" },
            }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de edición */}
      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, product: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Editar Producto</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Descripción"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Precio"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Categoría"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleFormChange}
                required
                error={!!categoryError}
                disabled={loadingCategories}
                helperText={
                  loadingCategories
                    ? "Cargando categorías..."
                    : categoryError || "Selecciona una categoría existente"
                }
              >
                <MenuItem value="">
                  <em>Seleccionar categoría</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
              {categoryError && (
                <Box
                  sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}
                >
                  <CategoryIcon sx={{ color: "#2697a6", fontSize: 18 }} />
                  <Link
                    component="button"
                    variant="body2"
                    onClick={handleGoToCategories}
                    sx={{
                      color: "#2697a6",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    Ir a crear categorías
                  </Link>
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="URL de Imagen"
                name="image"
                value={formData.image}
                onChange={handleFormChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, product: null })}>
            Cancelar
          </Button>
          <Button
            onClick={handleEditSubmit}
            disabled={!!categoryError || !formData.categoryName}
            sx={{
              bgcolor: "#2697a6",
              color: "white",
              "&:hover": { bgcolor: "#1f7a86" },
              "&:disabled": { bgcolor: "#ccc", color: "#666" },
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
