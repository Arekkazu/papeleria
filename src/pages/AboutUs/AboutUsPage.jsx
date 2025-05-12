import {
  Box,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import miguel from "../../assets/images/logo/logo1.jpg";
import juan from "../../assets/images/logo/logo1.jpg";
import alexander from "../../assets/images/logo/logo1.jpg";
import HeroBannerImg from "../../assets/images/hero.jpg";

export const AboutUsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const team = [
    {
      name: "Miguel Ortiz",
      role: "Desarrollador Frontend",
      image: miguel,
    },
    {
      name: "Juan Peña",
      role: "Diseñador UI/UX",
      image: juan,
    },
    {
      name: "Alexander Lozada",
      role: "Desarrollador Backend",
      image: alexander,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>
      <main style={{ flex: 1 }}>
        {/* Banner adaptado */}
        {/* Desktop */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 500, md: 700 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: `url(${HeroBannerImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Overlay */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1,
            }}
          />

          {/* Texto centrado */}
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              color: "#fff",
              textAlign: "center",
              px: 3,
              maxWidth: 800,
            }}
          >
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{ mb: 3, fontSize: { xs: "2.5rem", md: "3.5rem" } }}
            >
              Sobre Nosotros
            </Typography>
            <Typography variant="h6" paragraph>
              El Palacio del Papel es una papelería virtual fundada en 2025 como
              proyecto académico del curso Lenguajes para la Web, en la
              Universidad Surcolombiana.
            </Typography>
            <Typography variant="h6">
              Aunque actualmente se encuentra en fase de desarrollo, el proyecto
              apunta a consolidarse como una tienda virtual de referencia para
              productos de papelería en la región.
            </Typography>
          </Box>
        </Box>

        <Container maxWidth="lg">
          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 4,
                lineHeight: 1.1,
                fontSize: { xs: "2rem", md: "3rem" },
                textAlign: "center",
              }}
            >
              Misión y Visión
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: 3,
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Misión
                  </Typography>
                  <Typography variant="h6">
                    Brindar productos de papelería de calidad, accesibles y
                    confiables mediante una plataforma que prioriza al usuario.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    padding: 3,
                    height: "100%",
                  }}
                >
                  <Typography variant="h5" fontWeight={600} gutterBottom>
                    Visión
                  </Typography>
                  <Typography variant="h6">
                    Ser la tienda virtual líder en papelería del sur colombiano.
                    Ofreciendo productos de calidad y al mejor precio, donde se
                    destaque por su variablidad y atencion.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mt: 10 }}>
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 4,
                lineHeight: 1.1,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Nuestro Equipo
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {team.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ borderRadius: 4, boxShadow: 3 }}>
                    <CardMedia
                      component="img"
                      height="260"
                      image={member.image}
                      alt={`Foto de ${member.name}`}
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {member.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        align="center"
                        color="textSecondary"
                      >
                        {member.role}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ mt: 6, mb: 10 }}>
            {" "}
            {/* <- Aumentamos espacio inferior */}
            <Typography
              variant="h2"
              fontWeight={700}
              sx={{
                mb: 4,
                lineHeight: 1.1,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Contacto
            </Typography>
            <Typography variant="h6" paragraph>
              Déjanos tu mensaje. Un asesor se pondrá en contacto contigo lo
              antes posible.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nombre completo"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  variant="outlined"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Déjanos tu mensaje"
                  multiline
                  rows={4}
                  variant="outlined"
                  margin="normal"
                />
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Enviar Mensaje
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ width: "100%", height: 300 }}>
                  <iframe
                    title="Ubicación Neiva"
                    src="https://www.google.com/maps/embed?..."
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
