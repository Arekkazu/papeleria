import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#1e1e1e", color: "#fff", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Papelería Papeleria</Typography>
            <Typography variant="body2">
              Tu sitio confiable de papelería
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Enlaces</Typography>
            <Link href="#" color="inherit" underline="hover">
              Inicio
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Productos
            </Link>
            <br />
            <Link href="#" color="inherit" underline="hover">
              Contacto
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Síguenos</Typography>
            <IconButton color="inherit">
              <Facebook />
            </IconButton>
            <IconButton color="inherit">
              <Twitter />
            </IconButton>
            <IconButton color="inherit">
              <Instagram />
            </IconButton>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Papelería Papeleria. Todos los derechos
            reservados.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
