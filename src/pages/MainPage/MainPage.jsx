import { ContainerHeader } from "./MainPage.styles";
import { Box, Typography, Grid, Button, useTheme, useMediaQuery } from "@mui/material";
import { DiscoverCategory } from "../../components/common/categories/DiscoverCategory";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { ProductCard } from "../../components/common/products/ProductCard";
import { FeaturedProductsGrid } from "../../components/common/products/FeaturedProductsGrid";
import HeroBannerImg from "../../assets/images/hero.jpg"
export const MainPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <Navbar />
      </header>

      <main style={{ flex: 1 }}>
        {/* Hero/Banner principal */}
        {/* Versión Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: "row", justifyContent: "center", alignItems: "flex-start", my: 4, px: 2 }}>
          {/* Columna izquierda: título y promo */}
          <Box sx={{ flex: 1, maxWidth: 700, pr: 4, mb: { xs: 4, md: 0 } }}>
            <Typography variant="h2" fontWeight={700} sx={{ mb: 4, lineHeight: 1.1, fontSize: { xs: '2rem', md: '3rem' } }}>
              El Palacio Del Papel
            </Typography>
            <Box sx={{ bgcolor: '#2697a6', color: '#fff', borderRadius: 3, p: 3, minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 'fit-content' }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>Descubre lo mejor para tu regreso a clases</Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>¡Hazte con tu material escolar a precios increíbles!</Typography>
              <Button variant="contained" sx={{ bgcolor: '#fff', color: '#2697a6', width: 'fit-content', fontWeight: 700, '&:hover': { bgcolor: '#e0e0e0' } }}>Ver productos</Button>
            </Box>
          </Box>
          {/* Columna derecha: imagen placeholder */}
          <Box sx={{ flex: 1, maxWidth: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box component="img" src={HeroBannerImg} alt="Placeholder Hero" sx={{ width: '100%', height: { xs: 300, md: 400 }, objectFit: 'cover', borderRadius: 3, boxShadow: 2 }} />
          </Box>
        </Box>

        {/* Versión Mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, position: 'relative', height: 400, my: 4 }}>
          <Box
            component="img"
            src={HeroBannerImg}
            alt="Hero Background"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: -1,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              px: 3,
              textAlign: 'center',
            }}
          >
            <Typography 
              variant="h2" 
              fontWeight={700} 
              sx={{ 
                mb: 3, 
                lineHeight: 1.2, 
                fontSize: '2.5rem',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              {`El Palacio Del Papel`}
            </Typography>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#2697a6', 
                color: '#fff',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                '&:hover': { 
                  bgcolor: '#1f7a86' 
                } 
              }}
            >
              Ver productos
            </Button>
          </Box>
        </Box>

        {/* Categorías */}
        <DiscoverCategory />
        {/* Productos destacados */}
        <FeaturedProductsGrid />
      </main>

      <Footer />
    </Box>
  );
};
