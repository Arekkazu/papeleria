import { Snackbar, Alert } from "@mui/material";
export const CheckoutOk = ({ handleClose, open }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        ¡Compra realizada con éxito!
      </Alert>
    </Snackbar>
  );
};
