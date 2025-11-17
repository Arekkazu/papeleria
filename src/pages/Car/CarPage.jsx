import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { useCart } from "../../hooks/useCart";
import { useState } from "react";
import { CheckoutOk } from "../../components/common/snackbar/checkoutOk";
import { CheckoutBad } from "../../components/common/snackbar/checkoutBad";
import { DiscountCodeInput } from "../../components/common/discount/DiscountCodeInput";
import { useAuth } from "../../context/AuthContext";
import { cartService } from "../../services/api";

const DISCOUNT_KEY = "dragonball_discount";
const APPLIED_DISCOUNT_KEY = "applied_discount";

export const CarPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // Leer descuento de localStorage (Dragon Ball o aplicado manualmente)
  let descuento = 0;
  let descuentoLabel = "$0";
  let discountInfo = null;

  // Primero intentar con descuento aplicado manualmente
  const appliedDiscountData = localStorage.getItem(APPLIED_DISCOUNT_KEY);
  if (appliedDiscountData) {
    try {
      const data = JSON.parse(appliedDiscountData);
      discountInfo = data;
    } catch {}
  }

  // Si no hay descuento aplicado, usar el de Dragon Ball
  if (!discountInfo) {
    const dragonBallDiscountData = localStorage.getItem(DISCOUNT_KEY);
    if (dragonBallDiscountData) {
      try {
        discountInfo = JSON.parse(dragonBallDiscountData);
      } catch {}
    }
  }

  // Calcular descuento
  if (discountInfo) {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    descuento = Math.round(subtotal * discountInfo.discount);
    descuentoLabel = `-$${descuento.toLocaleString()}`;
  }

  // Calcular totales
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const total = subtotal - descuento;

  const handleFinish = async () => {
    if (!isAuthenticated()) {
      alert("Debes iniciar sesión para completar la compra");
      return;
    }

    if (cart.length === 0) {
      return;
    }

    try {
      setCheckoutLoading(true);
      setCheckoutError(null);

      // Llamar al backend para completar la compra
      const response = await cartService.checkout();

      if (response.success) {
        // Limpiar descuentos al finalizar compra exitosa
        localStorage.removeItem(DISCOUNT_KEY);
        localStorage.removeItem(APPLIED_DISCOUNT_KEY);

        // Mostrar modal de éxito
        setOpen(true);
      }
    } catch (error) {
      console.error("Error al completar la compra:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Error al procesar la compra";
      setCheckoutError(errorMessage);
      setShowErrorAlert(true);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    clearCart();
  };

  const handleDiscountApplied = (discount) => {
    setAppliedDiscount(discount);
    // Forzar re-render
    window.location.reload();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>
          <Navbar />
        </NavBox>
      </header>
      <main>
        <Box
          sx={{
            px: { xs: 1, md: 4 },
            py: 4,
            backgroundColor: "#f5f8fa",
            minHeight: "100vh",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {/* Tabla de productos */}
          <Paper
            sx={{
              flex: 2,
              p: 3,
              borderRadius: 4,
              minWidth: { xs: 0, md: 350 },
              width: { xs: "100%", sm: 400, md: "auto" },
              maxWidth: 800,
              mt: 4,
              boxSizing: "border-box",
              mb: { xs: 3, md: 0 },
            }}
          >
            <Typography
              variant="h4"
              sx={{ mb: 3, fontWeight: 700, mt: 2, textAlign: "left" }}
            >
              Tu Carrito
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Precio unitario</TableCell>
                    <TableCell align="center">Cantidad</TableCell>
                    <TableCell align="right">Precio</TableCell>
                    <TableCell align="center">Acción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No hay productos en tu mochila.
                      </TableCell>
                    </TableRow>
                  ) : (
                    cart.map((item, idx) => (
                      <TableRow key={item._id || item.name + idx}>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <img
                              src={item.image || "/no-image.png"}
                              alt={item.name}
                              width={40}
                              height={40}
                              style={{ objectFit: "contain", borderRadius: 6 }}
                            />
                            {item.name}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          ${item.price.toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <TextField
                            type="number"
                            size="small"
                            value={item.quantity}
                            inputProps={{
                              min: 1,
                              style: { width: 50, textAlign: "center" },
                            }}
                            onChange={(e) =>
                              updateQuantity(
                                item._id,
                                Math.max(1, Number(e.target.value)),
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">
                          ${(item.price * item.quantity).toLocaleString()}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="error"
                            onClick={() => removeFromCart(item._id)}
                            size="small"
                          >
                            Eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          {/* Resumen de compra */}
          <Paper
            sx={{
              flex: 1,
              p: 3,
              borderRadius: 4,
              minWidth: { xs: 0, md: 260 },
              width: { xs: "100%", sm: 350, md: 320 },
              maxWidth: 400,
              maxHeight: 450,
              alignSelf: { xs: "center", md: "flex-start" },
              mt: { xs: 0, md: 7 },
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              CheckOut
            </Typography>
            <Divider sx={{ mb: 2 }} />

            {/* Componente para aplicar código de descuento */}
            <DiscountCodeInput onDiscountApplied={handleDiscountApplied} />

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>SubTotal</Typography>
              <Typography>${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>Descuento</Typography>
              <Typography color={descuento > 0 ? "success.main" : "inherit"}>
                {descuentoLabel}
              </Typography>
            </Box>
            {discountInfo && (
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
              >
                <Typography variant="caption" color="text.secondary">
                  Código: {discountInfo.code || "Dragon Ball"}
                </Typography>
              </Box>
            )}
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total
              </Typography>
              <Typography variant="h6" fontWeight={700}>
                ${total.toLocaleString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ fontWeight: 700, py: 1.2, fontSize: 16 }}
              onClick={handleFinish}
              disabled={checkoutLoading || cart.length === 0}
            >
              {checkoutLoading ? "Procesando..." : "Finalizar Compra"}
            </Button>
          </Paper>
        </Box>
        {total != 0 ? (
          <CheckoutOk open={open} handleClose={handleClose} />
        ) : (
          <CheckoutBad open={open} handleClose={handleClose} />
        )}

        {/* Alerta de error en checkout */}
        <Snackbar
          open={showErrorAlert}
          autoHideDuration={6000}
          onClose={() => setShowErrorAlert(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowErrorAlert(false)}
            severity="error"
            sx={{ width: "100%", fontSize: 16, fontWeight: 600 }}
          >
            ❌ {checkoutError}
          </Alert>
        </Snackbar>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
