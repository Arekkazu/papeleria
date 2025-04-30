import { styled } from "@mui/material/styles";
import { Box, Toolbar, IconButton, Button, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

// Wrapper principal del AppBar
export const NavBarBox = styled(Box)(({ theme }) => ({
  width: "100%",
}));

// Estilo para el toolbar
export const HeaderToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgb(250, 246, 235)",
}));

// Logo
export const LogoImage = styled("img")(({ theme }) => ({
  height: "180px",
  width: "180px",
}));

// Barra de búsqueda
export const HeaderSearch = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#8CB7D1",
  borderRadius: "5px",
  paddingLeft: "50px",
  paddingRight: "20px",
  width: "150%",
  maxWidth: "650px",
  height: "60px",
  "&:hover": {
    backgroundColor: "#8CB7D1",
  },
}));

// Icono de búsqueda
export const SearchIconStyled = styled(Search)(({ theme }) => ({
  position: "absolute",
  left: 8,
  color: "#000000",
}));

// Input de búsqueda
export const SearchInput = styled(InputBase)(({ theme }) => ({
  width: "200%",
}));

// Botones de navegación
export const NavButton = styled(Button)(({ theme }) => ({
  color: "#3F5D7D",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    color: "#8CB7D1",
    transition: "background-color 0.3s ease",
  },
}));

// Iconos
export const NavIconButton = styled(IconButton)(({ theme }) => ({
  color: "#3F5D7D",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    color: "#8CB7D1",
    transition: "background-color 0.3s ease",
  },
}));
