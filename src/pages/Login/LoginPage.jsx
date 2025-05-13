import { Box, Grid } from "@mui/material";
import Footer from "../../components/footer";
import { Navbar } from "../../components/navbar";

export const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <Navbar />
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
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div style={{ backgroundColor: "red", width: "50px" }}>
                <p>asd</p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
