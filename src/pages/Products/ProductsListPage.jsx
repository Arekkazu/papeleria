import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { FooterBox } from "../../components/common/layouts/FooterBox/FootBox";
import { Box } from "@mui/material";
export const ProductsListPage = () => {
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
        <h1>Aqui ya iria el componente de productos</h1>
      </main>
      <FooterBox>
        <h1>FOOTER</h1>
      </FooterBox>
    </Box>
  );
};
