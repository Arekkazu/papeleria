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

const DISCOUNT_KEY = "dragonball_discount";

export const CarPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [open, setOpen] = useState(false);

  // Leer descuento de localStorage
  let descuento = 0;
  let descuentoLabel = "$0";
  const discountData = localStorage.getItem(DISCOUNT_KEY);
  if (discountData) {
    try {
      const { discount } = JSON.parse(discountData);
      const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      descuento = Math.round(subtotal * discount);
      descuentoLabel = `-$${descuento.toLocaleString()}`;
    } catch {}
  }

  // Calcular totales
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal - descuento;

  const handleFinish = () => {
    setOpen(true);
    // Limpiar descuento al finalizar compra
    localStorage.removeItem(DISCOUNT_KEY);
  };

  const handleClose = () => {
    setOpen(false);
    clearCart();
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
                      <TableRow key={item.name + idx}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <img src={item.image || "/no-image.png"} alt={item.name} width={40} height={40} style={{ objectFit: "contain", borderRadius: 6 }} />
                            {item.name}
                          </Box>
                        </TableCell>
                        <TableCell align="right">${item.price.toLocaleString()}</TableCell>
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
                                item.name,
                                Math.max(1, Number(e.target.value))
                              )
                            }
                          />
                        </TableCell>
                        <TableCell align="right">${(item.price * item.quantity).toLocaleString()}</TableCell>
                        <TableCell align="center">
                          <Button
                            color="error"
                            onClick={() => removeFromCart(item.name)}
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
              maxHeight: 320,
              alignSelf: { xs: "center", md: "flex-start" },
              mt: { xs: 0, md: 7 },
            }}
          >
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
              CheckOut
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>SubTotal</Typography>
              <Typography>${subtotal.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>Descuento</Typography>
              <Typography>{descuentoLabel}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
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
            >
              Finalizar Compra
            </Button>
          </Paper>
        </Box>
        {total != 0 ? (
          <CheckoutOk open={open} handleClose={handleClose} />
        ) : (
          <CheckoutBad open={open} handleClose={handleClose} />
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
