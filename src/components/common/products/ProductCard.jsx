import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useAuth } from "../../../context/AuthContext";
import { formatPrice } from "../../../utils/helpers"; // Importación correcta
import { useState } from "react";

export const ProductCard = ({ product, onView, onAdd }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showAuthAlert, setShowAuthAlert] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated()) {
      setShowAuthAlert(true);
      return;
    }

    try {
      await addToCart(product, 1);
      onView?.();
      if (onAdd) onAdd();
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const handleCloseAlert = () => {
    setShowAuthAlert(false);
  };

  const handleGoToLogin = () => {
    setShowAuthAlert(false);
    navigate("/login");
  };

  return (
    <Card
      sx={{
        maxWidth: 260,
        m: "auto",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          bgcolor: "#f5f8fa",
          height: 180,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain", height: 180, width: "100%" }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" align="center" fontWeight={700}>
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="center"
          fontWeight={600}
        >
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
        <Button
          component={Link}
          to={`/products/${encodeURIComponent(product.name)}`}
          variant="outlined"
          size="medium"
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Ver más
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{ borderRadius: 2, fontWeight: 700 }}
          onClick={handleAddToCart}
        >
          Añadir
        </Button>
      </CardActions>

      {/* Alerta para usuarios no autenticados */}
      <Snackbar
        open={showAuthAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
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
    </Card>
  );
};
