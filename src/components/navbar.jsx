import {
  HeaderToolbar,
  LogoImage,
  HeaderSearch,
  SearchIconStyled,
  SearchInput,
  NavButton,
  NavIconButton,
} from "./navbar.styles";
import {
  AppBar,
  Stack,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo/logo1.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleDrawerClick = (event) => {
    if (event.target === event.currentTarget || event.target.closest("li")) {
      toggleDrawer(false)(event);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setDrawerOpen(false);
    }
  };

  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Quiénes somos", path: "/about" },
    { label: "Productos", path: "/products" },
    { label: "API", path: "/api" },
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <HeaderToolbar>
        <Box sx={{ flex: 1 }}>
          <LogoImage src={logo} alt="logo" />
        </Box>

        {/* Barra de búsqueda */}
        <Box
          sx={{
            flex: 2,
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
          }}
        >
          <HeaderSearch>
            <SearchIconStyled />
            <SearchInput
              placeholder="Buscar..."
              inputProps={{ "aria-label": "buscar" }}
            />
          </HeaderSearch>
        </Box>

        {/* Navegación en desktop */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{
            flex: 1,
            justifyContent: "flex-end",
            display: { xs: "none", md: "flex" },
          }}
        >
          {menuItems.map(({ label, path }) => (
            <Link key={label} to={path} style={{ textDecoration: "none" }}>
              <NavButton>{label}</NavButton>
            </Link>
          ))}
          <Link to="/cart">
            <NavIconButton>
              <FontAwesomeIcon icon={faCartShopping} />
            </NavIconButton>
          </Link>
          <Link to="/login">
            <NavIconButton>
              <FontAwesomeIcon icon={faUser} />
            </NavIconButton>
          </Link>
        </Stack>

        {/* Botón hamburguesa en móvil */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>

        {/* Drawer en móvil */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ sx: { width: "100%", maxWidth: 320 } }}
        >
          <Box
            sx={{ p: 2 }}
            role="presentation"
            onClick={handleDrawerClick}
            onKeyDown={handleKeyDown}
          >
            <Box sx={{ mb: 3 }}>
              <HeaderSearch sx={{ width: "100%" }}>
                <SearchIconStyled />
                <SearchInput placeholder="Buscar..." inputProps={{ "aria-label": "buscar" }} />
              </HeaderSearch>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Menú móvil */}
            <List>
              {menuItems.map(({ label, path }) => (
                <Link key={label} to={path} style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem button sx={{ py: 1.5 }}>
                    <ListItemText
                      primary={label}
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Accesos rápidos */}
            <List>
              <Link to="/cart" style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ py: 1.5 }}>
                  <ListItemText
                    primary="Carrito"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </Link>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                <ListItem button sx={{ py: 1.5 }}>
                  <ListItemText
                    primary="Mi cuenta"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </Link>
            </List>
          </Box>
        </Drawer>
      </HeaderToolbar>
    </AppBar>
  );
};
