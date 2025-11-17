import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as CartIcon,
  AttachMoney as MoneyIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { adminService } from '../../services/api';

const StatCard = ({ title, value, icon, color = '#2697a6' }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="overline">
            {title}
          </Typography>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: `${color}20`,
            borderRadius: 2,
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await adminService.getStats();
      if (response.success) {
        setStats(response.stats);
      }
    } catch (err) {
      console.error('Error al cargar estadísticas:', err);
      setError(err.message || 'Error al cargar estadísticas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
        Resumen general de tu tienda
      </Typography>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Usuarios"
            value={stats?.totalUsers || 0}
            icon={<PeopleIcon sx={{ color: '#2697a6', fontSize: 40 }} />}
            color="#2697a6"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Productos"
            value={stats?.totalProducts || 0}
            icon={<InventoryIcon sx={{ color: '#34a853', fontSize: 40 }} />}
            color="#34a853"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ventas Totales"
            value={stats?.totalSales || 0}
            icon={<CartIcon sx={{ color: '#fbbc04', fontSize: 40 }} />}
            color="#fbbc04"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Ingresos Totales"
            value={`$${(stats?.totalRevenue || 0).toLocaleString()}`}
            icon={<MoneyIcon sx={{ color: '#ea4335', fontSize: 40 }} />}
            color="#ea4335"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Productos más vendidos */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              <TrendingIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Productos Más Vendidos
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Ingresos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stats?.topProducts?.length > 0 ? (
                    stats.topProducts.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.product?.name || 'N/A'}</TableCell>
                        <TableCell align="right">{item.totalQuantity}</TableCell>
                        <TableCell align="right">
                          ${item.totalRevenue.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} align="center">
                        No hay datos disponibles
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Estadísticas adicionales */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Estadísticas Adicionales
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Carritos Activos
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {stats?.activeCarts || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Categorías
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {stats?.totalCategories || 0}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Total Descuentos
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {stats?.totalDiscounts || 0}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
