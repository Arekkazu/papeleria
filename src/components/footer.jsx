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
              {["Inicio", "Quiénes somos", "Productos"].map((text) => (
                <FooterLink key={text} href="#">
                  {text}
                </FooterLink>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FooterTitle variant="h6">Síguenos</FooterTitle>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FooterIconButton size="small">
                <Facebook />
              </FooterIconButton>
              <FooterIconButton size="small">
                <Twitter />
              </FooterIconButton>
              <FooterIconButton size="small">
                <Instagram />
              </FooterIconButton>
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
