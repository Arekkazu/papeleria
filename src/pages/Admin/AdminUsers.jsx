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
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/api';

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, userId: null, username: '' });
  const [editDialog, setEditDialog] = useState({ open: false, user: null });
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    roleName: '',
  });

  useEffect(() => {
    loadUsers();
  }, [page, rowsPerPage, search]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(page + 1, rowsPerPage, search);
      if (response.success) {
        setUsers(response.users);
        setTotalUsers(response.pagination.total);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      setError(err.message || 'Error al cargar usuarios');
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

  const handleDeleteClick = (userId, username) => {
    setDeleteDialog({ open: true, userId, username });
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await adminService.deleteUser(deleteDialog.userId);
      if (response.success) {
        loadUsers();
        setDeleteDialog({ open: false, userId: null, username: '' });
      }
    } catch (err) {
      console.error('Error al eliminar usuario:', err);
      setError(err.message || 'Error al eliminar usuario');
    }
  };

  const handleEditClick = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      roleName: user.rol?.roleName || '',
    });
    setEditDialog({ open: true, user });
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const response = await adminService.updateUser(editDialog.user._id, formData);
      if (response.success) {
        loadUsers();
        setEditDialog({ open: false, user: null });
      }
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      setError(err.message || 'Error al actualizar usuario');
    }
  };

  const getRoleColor = (roleName) => {
    switch (roleName) {
      case 'admin':
        return '#ea4335'; // Rojo
      case 'manager':
        return '#fbbc04'; // Amarillo/Naranja
      default:
        return '#9e9e9e'; // Gris
    }
  };

  const getRoleStyle = (roleName) => {
    const color = getRoleColor(roleName);
    return {
      bgcolor: `${color}20`,
      color: color,
      fontWeight: 600,
    };
  };

  if (loading && users.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Gestión de Usuarios
      </Typography>

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
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
        </Box>

        {/* Tabla de usuarios */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de Usuario</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
                <TableCell>Fecha de Registro</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.rol?.roleName || 'N/A'}
                      size="small"
                      sx={getRoleStyle(user.rol?.roleName)}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      onClick={() => handleEditClick(user)}
                      sx={{ color: '#2697a6', mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(user._id, user.username)}
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
          count={totalUsers}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>

      {/* Dialog de confirmación de eliminación */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, userId: null, username: '' })}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar al usuario <strong>{deleteDialog.username}</strong>?
          </Typography>
          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
            Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, userId: null, username: '' })}>
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

      {/* Dialog de edición */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, user: null })} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Usuario</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
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
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleFormChange}
                  label="Rol"
                >
                  <MenuItem value="user">Usuario</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                  <MenuItem value="admin">Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, user: null })}>
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
