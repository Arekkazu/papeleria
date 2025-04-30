import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import { FooterBox } from "../../components/common/layouts/FooterBox/FootBox";
import { Box } from "@mui/material";
export const CarPage = () => {
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
        <Box
          sx={{ px: 4, py: 4, backgroundColor: "#e0e0e0", minHeight: "100vh" }}
        >
          <h1>MAIN</h1>
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
