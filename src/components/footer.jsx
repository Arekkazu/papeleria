import {
  FooterContainer,
  FooterIconButton,
  FooterLink,
  FooterTitle,
  LogoImg,
} from "./footer.styles";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import logo from "../assets/images/logo/logo1.jpg";
import { Link as RouterLink } from "react-router-dom";


const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <LogoImg src={logo} alt="logo" />
              <Typography variant="h6" fontWeight="bold">
                El Palacio del Papel
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Tu sitio confiable de papelería
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FooterTitle variant="h6">Enlaces rápidos</FooterTitle>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <FooterLink component={RouterLink} to="/">
                Inicio
              </FooterLink>
              <FooterLink component={RouterLink} to="/about">
                Nosotros
              </FooterLink>
              <FooterLink component={RouterLink} to="/products">
                Productos
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FooterTitle variant="h6">Síguenos</FooterTitle>
            <Box sx={{ display: "flex", gap: 1 }}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterIconButton size="small">
                  <Facebook />
                </FooterIconButton>
              </a>

              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterIconButton size="small">
                  <Twitter />
                </FooterIconButton>
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FooterIconButton size="small">
                  <Instagram />
                </FooterIconButton>
              </a>
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" align="center" color="#777" sx={{ mt: 4 }}>
          © {new Date().getFullYear()} El Palacio del Papel. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
