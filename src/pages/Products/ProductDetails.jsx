import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { FooterBox } from "../../components/common/layouts/FooterBox/FootBox";
import { Box } from "@mui/material";
import { DiscoverCategory } from "../../components/common/categories/DiscoverCategory";
export const ProductsDetailsPage = () => {
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
          <h1>NAVBAR</h1>
        </NavBox>
      </header>
      <main>
        <Box sx={{ px: 4, py: 2 }}>
          <Box
            sx={{
              minHeight: "400px", // Si presenta problema puedes eliminarlo
              mb: 4,
              backgroundColor: "#e0e0e0", // Solo el color para dar idea del layout
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Aqui ya iria el componente de productos</h1>
          </Box>
          <Box>
            <DiscoverCategory />
          </Box>
        </Box>
      </main>
      <footer>
        <FooterBox>
          <h1>FOOTER</h1>
        </FooterBox>
      </footer>
    </Box>
  );
};
