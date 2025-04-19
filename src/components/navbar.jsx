import { AppBar, Toolbar, IconButton, InputBase, Box, Button, Stack} from '@mui/material';
  import { Search } from '@mui/icons-material';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
  import logo1 from '../img/logo1.jpg';
export const Navbar = () => {

    return(
        <AppBar position="static" color="default" elevation={1}>
        <Toolbar className="header-toolbar">


          <Box className="header-logo">
            <img src={logo1} alt="logo" className="logo" />
          </Box>
  

          <Box className="header-search">
            <Search className="search-icon" />
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              className="search-input"
            />
          </Box>
  

          <Stack direction="row" spacing={2} alignItems="center">
            <Button href='#'  className='nav-button'>Inicio</Button>
            <Button href='#'  className='nav-button'>Quiénes somos</Button>
            <Button href='#'  className='nav-button'>Productos</Button>
            <IconButton  className='nav-button' component="a" href="#">
            <FontAwesomeIcon icon={faCartShopping} />
            </IconButton>
            <IconButton  className='nav-button' component="a" href="#">
            <FontAwesomeIcon icon={faUser} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
   

    )

}