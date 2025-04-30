import { ContainerHeader } from "./MainPage.styles";
import { Box } from "@mui/material";
import { DiscoverCategory } from "../../components/common/categories/DiscoverCategory";
import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { FooterBox } from "../../components/common/layouts/FooterBox/FootBox";
export const MainPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>{/* Seccion de Navbar */}</NavBox>

        <section>
          {/* Seccion Header */}
          <ContainerHeader>
            <Box
              sx={{
                backgroundColor: "#f97a03", // Fondo naranja
                width: "50%",
                height: "200px",
                padding: "1rem",
              }}
            >
              <p>Este es un div con fondo naranja, sin centrado.</p>
            </Box>
          </ContainerHeader>
        </section>
      </header>

      <main style={{ backgroundColor: "red" }}>
        <DiscoverCategory />
      </main>

      <footer>
        <FooterBox>{/* Seccion de Footer */}</FooterBox>
      </footer>
    </Box>
  );
};
