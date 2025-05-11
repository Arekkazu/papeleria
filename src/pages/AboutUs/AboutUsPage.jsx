import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { FooterBox } from "../../components/common/layouts/FooterBox/FootBox";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

export const AboutUsPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        {/* Header */}
        <Navbar />
      </header>
      <main>
        {/* Título principal */}
        <Box
          sx={{ backgroundColor: "#ffcc00", p: 4, mt: 2, textAlign: "center" }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sobre nosotros
          </Typography>
        </Box>

        {/* Historia */}
        <Box
          sx={{
            backgroundColor: "#00bcd4",
            p: 4,
            mt: 2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {/* SE PUEDE REEMPLAZAR EL GRID POR EL COMPONENTE QUE SE HATA */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {/* ED */}
              <Box sx={{ backgroundColor: "#4dd0e1", minHeight: 250, p: 2 }}>
                EDITAR ACA
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ backgroundColor: "#4dd0e1", minHeight: 250, p: 2 }}>
                EDITAR ACA
              </Box>
            </Grid>
          </Grid>
          {/* ------------------------------------------------------------- */}
        </Box>

        {/* Misión y Visión */}
        <Box
          sx={{
            backgroundColor: "#8bc34a",
            p: 4,
            mt: 2,
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <p>ESTO ES DE VISION Y MISION</p>
          {/* SE PUEDE REEMPLAZAR EL GRID POR EL COMPONENTE MISION Y VISION */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: "#7e57c2", height: 200 }}></Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ backgroundColor: "#7e57c2", height: 200 }} />
            </Grid>
          </Grid>
          {/* ------------------------------------------------------------- */}
        </Box>

        {/* Opiniones */}
        <Box sx={{ backgroundColor: "#7e57c2", p: 4, mt: 2 }}>
          <Box
            sx={{
              backgroundColor: "#b39ddb",
              height: 60,
              width: "30%",
              mx: "auto",
              mb: 4,
            }}
          >
            <Typography variant="h4" align="center">
              Opiniones de nuestros clientes
            </Typography>
          </Box>
          {/* AQUI DONDE SE REEMPLAZA LAS OPINIONES */}
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ backgroundColor: "#9575cd", height: 200 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ backgroundColor: "#9575cd", height: 200 }} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ backgroundColor: "#9575cd", height: 200 }} />
            </Grid>
          </Grid>
          {/* -------- */}
        </Box>
      </main>
      {/* Footer */}
      <footer>

          <Footer /> {/* Exportancion del componente */}

      </footer>
    </Box>
  );
};
