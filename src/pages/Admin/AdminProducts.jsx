import { useEffect, useState } from 'react';
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
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/api';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, productId: null, productName: '' });
  const [editDialog, setEditDialog] = useState({ open: false, product: null });
  const [createDialog, setCreateDialog] = useState({ open: false });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    categoryName: '',
    image: '',
  });

  useEffect(() => {
    loadProducts();
  }, [page, rowsPerPage, search]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await adminService.getProductsAdmin(page + 1, rowsPerPage, '', search);
      if (response.success) {
        setProducts(response.products);
        setTotalProducts(response.pagination.total);
      }
    } catch (err) {
      console.error('Error al cargar productos:', err);
      setError(err.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
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

  const handleDeleteClick = (productId, productName) => {
    setDeleteDialog({ open: true, productId, productName });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await adminService.deleteProduct(deleteDialog.productId);
      if (response.success) {
        loadProducts();
        setDeleteDialog({ open: false, productId: null, productName: '' });
      }
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setError(err.message || 'Error al eliminar producto');
    }
  };

  const handleEditClick = (product) => {
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price,
      stock: product.stock,
      categoryName: product.categoryName || '',
      image: product.image || '',
    });
    setEditDialog({ open: true, product });
  };

  const handleCreateClick = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      categoryName: '',
      image: '',
    });
    setCreateDialog({ open: true });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateSubmit = async () => {
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
      }
    } catch (err) {
      console.error('Error al crear producto:', err);
      setError(err.message || 'Error al crear producto');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      };
      const response = await adminService.updateProduct(editDialog.product._id, productData);
      if (response.success) {
        loadProducts();
        setEditDialog({ open: false, product: null });
      }
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      setError(err.message || 'Error al actualizar producto');
    }
  };

  if (loading && products.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: '#2697a6' }} />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Gestión de Productos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateClick}
          sx={{
            bgcolor: '#2697a6',
            '&:hover': { bgcolor: '#1f7a86' },
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
        {/* Barra de búsqueda */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

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
                  <TableCell>{product.categoryName || product.category?.name || 'N/A'}</TableCell>
                  <TableCell align="right">${product.price.toLocaleString()}</TableCell>
                  <TableCell align="right">{product.stock}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(product)}
                      sx={{ color: '#2697a6', mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(product._id, product.name)}
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
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, productId: null, productName: '' })}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el producto <strong>{deleteDialog.productName}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, productId: null, productName: '' })}>
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm}
            sx={{ 
              bgcolor: '#ea4335', 
              color: 'white',
              '&:hover': { bgcolor: '#c5221f' }
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de creación */}
      <Dialog open={createDialog.open} onClose={() => setCreateDialog({ open: false })} maxWidth="sm" fullWidth>
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
                fullWidth
                label="Categoría"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleFormChange}
              />
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
            sx={{ 
              bgcolor: '#2697a6',
              color: 'white',
              '&:hover': { bgcolor: '#1f7a86' }
            }}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de edición */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, product: null })} maxWidth="sm" fullWidth>
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
                fullWidth
                label="Categoría"
                name="categoryName"
                value={formData.categoryName}
                onChange={handleFormChange}
              />
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
            sx={{ 
              bgcolor: '#2697a6',
              color: 'white',
              '&:hover': { bgcolor: '#1f7a86' }
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
