import React from "react";
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
} from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";
import miguel from "../../assets/images/logo/logo1.jpg";
import juan from "../../assets/images/logo/logo1.jpg";
import alexander from "../../assets/images/logo/logo1.jpg";

export const AboutUsPage = () => {
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
      <main>
        <Box sx={{ backgroundColor: "#FFFFFF", py: 6 }}>
          <Container maxWidth="lg">
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                component="h1"
                align="center"
                gutterBottom
              >
                Sobre Nosotros
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    El Palacio del Papel es una papelería virtual fundada en
                    2025 como proyecto académico del curso Lenguajes para la
                    Web, en la Universidad Surcolombiana. Surgió como proyecto a
                    realizar al grupo de tres estudiantes de Ingeniería de
                    Software: Miguel Ortiz, Juan Peña y Alexander Lozada. Aunque
                    actualmente se encuentra en fase de desarrollo, el proyecto
                    apunta a consolidarse como una tienda virtual de referencia
                    para productos de papelería en la región.
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Ubicados en Neiva, Huila, operamos exclusivamente en línea,
                    ofreciendo productos escolares, de oficina y de arte para
                    todos los públicos. Nuestro objetivo es facilitar el acceso
                    a artículos de calidad con un servicio confiable y cercano.
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom>
                Misión y Visión
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Misión:</strong> Brindar productos de papelería escolar,
                de oficina y arte de forma accesible, confiable y de calidad,
                mediante una plataforma en línea que prioriza la experiencia del
                usuario y la cercanía con el cliente.
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Visión:</strong> Convertirnos en la tienda virtual líder
                en soluciones de papelería en el sur del país, siendo
                reconocidos por nuestra innovación, eficiencia y compromiso con
                la satisfacción del cliente.
              </Typography>
            </Box>

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom>
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

            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" gutterBottom>
                Contacto
              </Typography>
              <Typography variant="body2" paragraph>
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
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.645168378289!2d-75.29522178523716!3d2.936579697847859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3b746f1a1898e3%3A0x9b9a6c1680c91a3a!2sNeiva%2C%20Huila!5e0!3m2!1ses!2sco!4v1614873132143!5m2!1ses!2sco"
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
        </Box>
      </main>
      <footer>
        <Footer /> {/* Exportancion del componente */}
      </footer>
    </Box>
  );
};
