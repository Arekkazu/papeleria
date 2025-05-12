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
    // Solo cerrar el drawer si el clic fue en el fondo o en un elemento de navegación
    if (event.target === event.currentTarget || event.target.closest("li")) {
      toggleDrawer(false)(event);
    }
  };

  const handleKeyDown = (event) => {
    // Solo cerrar el drawer si se presiona Escape
    if (event.key === "Escape") {
      setDrawerOpen(false);
    }
  };

  const menuItems = ["Inicio", "Quiénes somos", "Productos"];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <HeaderToolbar>
        <Box sx={{ flex: 1 }}>
          <LogoImage src={logo} alt="logo" />
        </Box>

        {/* Barra de búsqueda - visible solo en desktop */}
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

        {/* Navegación y botones - visibles solo en desktop */}
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
          {menuItems.map((text) => (
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

        {/* Botón hamburguesa - visible solo en móvil */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={toggleDrawer(true)}
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>

        {/* Drawer para móvil */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: {
              width: "100%",
              maxWidth: 320,
            },
          }}
        >
          <Box
            sx={{ p: 2 }}
            role="presentation"
            onClick={handleDrawerClick}
            onKeyDown={handleKeyDown}
          >
            {/* Barra de búsqueda en el drawer */}
            <Box sx={{ mb: 3 }}>
              <HeaderSearch
                sx={{ width: "100%" }}
                onClick={(e) => e.stopPropagation()}
              >
                <SearchIconStyled />
                <SearchInput
                  placeholder="Buscar..."
                  inputProps={{ "aria-label": "buscar" }}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </HeaderSearch>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Menú de navegación */}
            <List>
              {menuItems.map((text) => (
                <ListItem
                  button
                  key={text}
                  sx={{
                    py: 1.5,
                    "&:hover": {
                      bgcolor: "rgba(38, 151, 166, 0.08)",
                    },
                  }}
                >
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />

            {/* Accesos rápidos */}
            <List>
              <ListItem
                button
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(38, 151, 166, 0.08)",
                  },
                }}
              >
                <ListItemText
                  primary="Carrito"
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItem>
              <ListItem
                button
                sx={{
                  py: 1.5,
                  "&:hover": {
                    bgcolor: "rgba(38, 151, 166, 0.08)",
                  },
                }}
              >
                <ListItemText
                  primary="Mi cuenta"
                  primaryTypographyProps={{
                    fontWeight: 500,
                  }}
                />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </HeaderToolbar>
    </AppBar>
  );
};
