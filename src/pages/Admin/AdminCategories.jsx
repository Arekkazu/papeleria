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
  Chip,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/api';

export const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [totalCategories, setTotalCategories] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, categoryId: null, categoryName: '' });
  const [editDialog, setEditDialog] = useState({ open: false, category: null });
  const [createDialog, setCreateDialog] = useState({ open: false });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    loadCategories();
  }, [page, rowsPerPage, search]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await adminService.getCategoriesAdmin(page + 1, rowsPerPage, search);
      if (response.success) {
        setCategories(response.categories);
        setTotalCategories(response.pagination.total);
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setError(err.message || 'Error al cargar categorías');
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

  const handleDeleteClick = (categoryId, categoryName) => {
    setDeleteDialog({ open: true, categoryId, categoryName });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await adminService.deleteCategory(deleteDialog.categoryId);
      if (response.success) {
        loadCategories();
        setDeleteDialog({ open: false, categoryId: null, categoryName: '' });
      }
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      setError(err.message || 'Error al eliminar categoría');
    }
  };

  const handleEditClick = (category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
    });
    setEditDialog({ open: true, category });
  };

  const handleCreateClick = () => {
    setFormData({
      name: '',
      description: '',
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
      const response = await adminService.createCategory(formData);
      if (response.success) {
        loadCategories();
        setCreateDialog({ open: false });
      }
    } catch (err) {
      console.error('Error al crear categoría:', err);
      setError(err.message || 'Error al crear categoría');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await adminService.updateCategory(editDialog.category._id, formData);
      if (response.success) {
        loadCategories();
        setEditDialog({ open: false, category: null });
      }
    } catch (err) {
      console.error('Error al actualizar categoría:', err);
      setError(err.message || 'Error al actualizar categoría');
    }
  };

  if (loading && categories.length === 0) {
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
          Gestión de Categorías
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
          Nueva Categoría
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
            placeholder="Buscar categorías..."
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

        {/* Tabla de categorías */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell align="center">Productos</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category._id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{category.name}</Typography>
                  </TableCell>
                  <TableCell>{category.description || '-'}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={category.productsCount || 0} 
                      size="small"
                      sx={{ 
                        bgcolor: '#e3f2fd',
                        color: '#2697a6',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(category)}
                      sx={{ color: '#2697a6', mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(category._id, category.name)}
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
          count={totalCategories}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>

      {/* Dialog de eliminación */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, categoryId: null, categoryName: '' })}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar la categoría <strong>{deleteDialog.categoryName}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer y afectará a los productos asociados.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, categoryId: null, categoryName: '' })}>
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
        <DialogTitle>Crear Nueva Categoría</DialogTitle>
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
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, category: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Categoría</DialogTitle>
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, category: null })}>
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
