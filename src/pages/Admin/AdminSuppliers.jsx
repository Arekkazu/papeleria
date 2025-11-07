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
  Phone as PhoneIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/api';

export const AdminSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, supplierId: null, supplierName: '' });
  const [editDialog, setEditDialog] = useState({ open: false, supplier: null });
  const [createDialog, setCreateDialog] = useState({ open: false });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });

  useEffect(() => {
    loadSuppliers();
  }, [page, rowsPerPage, search]);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getSuppliersAdmin(page + 1, rowsPerPage, search);
      if (response.success) {
        setSuppliers(response.suppliers);
        setTotalSuppliers(response.pagination.total);
      }
    } catch (err) {
      console.error('Error al cargar proveedores:', err);
      setError(err.message || 'Error al cargar proveedores');
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

  const handleDeleteClick = (supplierId, supplierName) => {
    setDeleteDialog({ open: true, supplierId, supplierName });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await adminService.deleteSupplier(deleteDialog.supplierId);
      if (response.success) {
        loadSuppliers();
        setDeleteDialog({ open: false, supplierId: null, supplierName: '' });
      }
    } catch (err) {
      console.error('Error al eliminar proveedor:', err);
      setError(err.message || 'Error al eliminar proveedor');
    }
  };

  const handleEditClick = (supplier) => {
    setFormData({
      name: supplier.name,
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      description: supplier.description || '',
    });
    setEditDialog({ open: true, supplier });
  };

  const handleCreateClick = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
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
      const response = await adminService.createSupplier(formData);
      if (response.success) {
        loadSuppliers();
        setCreateDialog({ open: false });
      }
    } catch (err) {
      console.error('Error al crear proveedor:', err);
      setError(err.message || 'Error al crear proveedor');
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await adminService.updateSupplier(editDialog.supplier._id, formData);
      if (response.success) {
        loadSuppliers();
        setEditDialog({ open: false, supplier: null });
      }
    } catch (err) {
      console.error('Error al actualizar proveedor:', err);
      setError(err.message || 'Error al actualizar proveedor');
    }
  };

  if (loading && suppliers.length === 0) {
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
          Gestión de Proveedores
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
          Nuevo Proveedor
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
            placeholder="Buscar proveedores..."
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

        {/* Tabla de proveedores */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id} hover>
                  <TableCell>
                    <Typography fontWeight={600}>{supplier.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <EmailIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {supplier.email || '-'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {supplier.phone || '-'}
                    </Box>
                  </TableCell>
                  <TableCell>{supplier.address || '-'}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(supplier)}
                      sx={{ color: '#2697a6', mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(supplier._id, supplier.name)}
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
          count={totalSuppliers}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>

      {/* Dialog de eliminación */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, supplierId: null, supplierName: '' })}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el proveedor <strong>{deleteDialog.supplierName}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, supplierId: null, supplierName: '' })}>
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
        <DialogTitle>Crear Nuevo Proveedor</DialogTitle>
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
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
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
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, supplier: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Proveedor</DialogTitle>
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
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Teléfono"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Dirección"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
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
          <Button onClick={() => setEditDialog({ open: false, supplier: null })}>
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
