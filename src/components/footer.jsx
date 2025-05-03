import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import logo1 from "../img/logo1.jpg";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", color: "#333", mt: 8 }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <img
                src={logo1}
                alt="logo"
                style={{ width: "50px", height: "auto", borderRadius: "8px" }}
              />
              <Typography variant="h6" fontWeight="bold">
                El Palacio del Papel
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Tu sitio confiable de papelería
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Enlaces rápidos
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              {["Inicio", "Quiénes somos", "Productos"].map((text) => (
                <Link key={text} href="#" color="inherit" underline="hover">
                  {text}
                </Link>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Síguenos
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton color="inherit" size="small">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" size="small">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" color="text.secondary">
          © {new Date().getFullYear()} El Palacio del Papel. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
