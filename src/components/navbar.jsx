import {
  HeaderToolbar,
  LogoImage,
  HeaderSearch,
  SearchIconStyled,
  SearchInput,
  NavButton,
  NavIconButton,
} from "./navbar.styles";
import { AppBar, Stack, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo/logo1.jpg";

export const Navbar = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <HeaderToolbar>
        <Box sx={{ flex: 1 }}>
          <LogoImage src={logo} alt="logo" />
        </Box>

        <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <HeaderSearch>
            <SearchIconStyled />
            <SearchInput
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
            />
          </HeaderSearch>
        </Box>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ flex: 1, justifyContent: "flex-end" }}
        >
          {["Inicio", "Quiénes somos", "Productos"].map((text) => (
            <NavButton key={text} href="#">
              {text}
            </NavButton>
          ))}
          <NavIconButton href="#">
            <FontAwesomeIcon icon={faCartShopping} />
          </NavIconButton>
          <NavIconButton href="#">
            <FontAwesomeIcon icon={faUser} />
          </NavIconButton>
        </Stack>
      </HeaderToolbar>
    </AppBar>
  );
};
