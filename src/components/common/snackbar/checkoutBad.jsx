import { Snackbar, Alert } from "@mui/material";
export const CheckoutBad = ({ handleClose, open }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        Error al relizar la compra: No se detectaron productos en la mochila
      </Alert>
    </Snackbar>
  );
};
