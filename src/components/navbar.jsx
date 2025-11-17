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
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faBars,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/images/logo/logo1.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleUserMenuClose();
    await logout();
    navigate("/");
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
          <Link to="/">
            <LogoImage src={logo} alt="logo" />
          </Link>
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

          {/* Mostrar usuario o botón de login */}
          {isAuthenticated() ? (
            <>
              <Button
                onClick={handleUserMenuOpen}
                sx={{
                  textTransform: "none",
                  color: "text.primary",
                  fontWeight: 500,
                }}
                startIcon={<FontAwesomeIcon icon={faUser} />}
              >
                {user?.username}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={() => { handleUserMenuClose(); navigate("/cart"); }}>
                  Mi Carrito
                </MenuItem>
                {user?.role === "admin" && (
                  <>
                    <Divider />
                    <MenuItem onClick={() => { handleUserMenuClose(); navigate("/admin"); }}>
                      Panel de Administración
                    </MenuItem>
                  </>
                )}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 8 }} />
                  Cerrar Sesión
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link to="/login">
              <NavIconButton>
                <FontAwesomeIcon icon={faUser} />
              </NavIconButton>
            </Link>
          )}
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
            {/* Mostrar usuario en móvil */}
            {isAuthenticated() && (
              <Box sx={{ mb: 2, p: 2, bgcolor: "primary.light", borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Hola, {user?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <HeaderSearch sx={{ width: "100%" }}>
                <SearchIconStyled />
                <SearchInput
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "buscar" }}
                />
              </HeaderSearch>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Menú móvil */}
            <List>
              {menuItems.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
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
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem button sx={{ py: 1.5 }}>
                  <ListItemText
                    primary="Carrito"
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </Link>
              
              {isAuthenticated() ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin"
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <ListItem button sx={{ py: 1.5 }}>
                        <ListItemText
                          primary="Panel de Admin"
                          primaryTypographyProps={{ fontWeight: 500 }}
                        />
                      </ListItem>
                    </Link>
                  )}
                  <ListItem button sx={{ py: 1.5 }} onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: 12 }} />
                    <ListItemText
                      primary="Cerrar Sesión"
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </>
              ) : (
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button sx={{ py: 1.5 }}>
                    <ListItemText
                      primary="Iniciar Sesión"
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                </Link>
              )}
            </List>
          </Box>
        </Drawer>
      </HeaderToolbar>
    </AppBar>
  );
};
