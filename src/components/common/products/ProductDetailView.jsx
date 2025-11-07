import { Box, Typography, Button, TextField, Paper, Divider, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const ProductDetailView = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  //Funcion OnClick para agregar al carrito
  const handleAdd = async () => {
    if (!isAuthenticated()) {
      setShowAuthAlert(true);
      return;
    }

    try {
      await addToCart(producto, cantidad);
      setMsg(`Se agregaron ${cantidad} unidad${cantidad > 1 ? 'es' : ''} de "${producto.name}" al carrito.`);
      setOpen(true);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const handleBuy = async () => {
    if (!isAuthenticated()) {
      setShowAuthAlert(true);
      return;
    }

    try {
      await addToCart(producto, cantidad);
      navigate("/cart");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const handleCloseAuthAlert = () => {
    setShowAuthAlert(false);
  };

  const handleGoToLogin = () => {
    setShowAuthAlert(false);
    navigate("/login");
  };

  return (
    <Box sx={{
      width: '100%',
      minHeight: { xs: 400, md: 420 },
      py: 6,
      px: { xs: 0, md: 2 },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      background: 'linear-gradient(135deg, #f5f8fa 60%, #e3e9f3 100%)',
    }}>
      <Paper elevation={4} sx={{
        p: { xs: 2, md: 5 },
        borderRadius: 5,
        width: '100%',
        maxWidth: 1100,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 4, md: 6 },
        alignItems: { xs: 'center', md: 'flex-start' },
        boxShadow: 6,
        background: '#fff',
      }}>
        {/* Imagen */}
        <Box sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 280,
        }}>
          <Box sx={{
            width: 300,
            height: 300,
            bgcolor: '#f5f5f5',
            borderRadius: 4,
            boxShadow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}>
            <img
              src={producto.image}
              alt={producto.name}
              style={{ maxWidth: 260, maxHeight: 260, objectFit: 'contain', borderRadius: 10 }}
            />
          </Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, textAlign: 'center', letterSpacing: 1 }}>{producto.name}</Typography>
        </Box>
        {/* Divider vertical en desktop */}
        <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, mx: 2, borderColor: '#e0e0e0' }} />
        {/* Info y compra */}
        <Box sx={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>Descripción:</Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary', fontSize: 18 }}>
            {producto.description || "Este es un excelente producto de papelería ideal para tus necesidades escolares, de oficina o personales."}
          </Typography>
          <Box sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Box sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 3,
              p: 3,
              width: '100%',
              maxWidth: 350,
              background: '#fafafa',
              boxShadow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 600, fontSize: 20, textAlign: 'center' }}>Precio: <span style={{ color: '#2697a6' }}><b>${producto.price.toLocaleString()}</b></span></Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%', justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 500 }}>Cantidad:</Typography>
                <TextField
                  type="number"
                  size="small"
                  value={cantidad}
                  inputProps={{ min: 1, style: { width: 70, textAlign: 'center', fontWeight: 600, fontSize: 18, borderRadius: 8 } }}
                  sx={{
                    '& .MuiInputBase-root': {
                      borderRadius: 2,
                      fontSize: 18,
                      fontWeight: 600,
                      background: '#fff',
                    },
                    width: 80,
                  }}
                  onChange={e => setCantidad(Math.max(1, Number(e.target.value)))}
                />
              </Box>
              <Button variant="outlined" fullWidth sx={{ mb: 1, fontWeight: 700, py: 1.2, fontSize: 16 }} onClick={handleAdd}>Agregar al carrito</Button>
              <Button variant="contained" fullWidth sx={{ fontWeight: 700, py: 1.2, fontSize: 16 }} onClick={handleBuy}>Comprar Ahora</Button>
            </Box>
          </Box>
        </Box>
      </Paper>
      
      {/* SnackBar Para mostrar brevemente la alerta de que se agrego al carrito */}
      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>

      {/* Alerta para usuarios no autenticados */}
      <Snackbar
        open={showAuthAlert}
        autoHideDuration={6000}
        onClose={handleCloseAuthAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAuthAlert}
          severity="warning"
          sx={{ width: "100%" }}
          action={
            <Button color="inherit" size="small" onClick={handleGoToLogin}>
              Iniciar Sesión
            </Button>
          }
        >
          Debes iniciar sesión para agregar productos al carrito
        </Alert>
      </Snackbar>
    </Box>
  );
}; 
