import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { Box, Grid } from "@mui/material";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
export const RegisterPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>
          <Navbar />
        </NavBox>
      </header>
      <main>
        <Box
          sx={{
            px: 4,
            py: 4,
            backgroundColor: "#e0e0e0",
            minHeight: "100vh",
          }}
        >
          <Grid container spacing={2}>
            {/* EDITAR ACA */}
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 6 }}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
            {/* ---- */}
          </Grid>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
