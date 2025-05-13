import { Box, Typography, Paper } from "@mui/material";

export const ProductNotFoundView = () => (
  <Paper elevation={2} sx={{ p: 5, borderRadius: 4, maxWidth: 500, width: '100%', textAlign: 'center', background: '#fff' }}>
    <Typography variant="h4" color="error" sx={{ fontWeight: 700, mb: 2 }}>
      Lo sentimos
    </Typography>
    <Typography variant="body1" color="text.secondary">
      El producto que buscas no existe o no se encuentra disponible.<br />
      Por favor, revisa el nombre o vuelve a la página de productos.
    </Typography>
  </Paper>
); 