import { NavBarBox } from "./NavBarBox.style";
import { Box } from "@mui/material";
export const NavBox = ({ children }) => {
  return (
    <NavBarBox>
      <Box
        sx={{
          backgroundColor: "blue", // Fondo naranja
          width: "100%",
          height: "10vh",
        }}
      >
        {children || <p>SE SUPONE QUE ES NAVBAR</p>}
      </Box>
    </NavBarBox>
  );
};
