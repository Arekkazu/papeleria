import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

export const ProductCard = ({ product }) => {
  const priceCOP = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price);
  return (
    <Card sx={{ maxWidth: 260, m: 'auto', borderRadius: 3, boxShadow: 3, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-6px)', boxShadow: 6 } }}>
      <Box sx={{ bgcolor: '#f5f8fa', display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
        <CardMedia
          component="img"
          height="140"
          image={product.image || 'https://via.placeholder.com/200x200?text=Producto'}
          alt={product.name}
          sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" align="center" fontWeight={700}>
          {product.name}
        </Typography>
        <Typography variant="body1" color="primary" align="center" fontWeight={600}>
          {priceCOP}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button size="medium" variant="contained" sx={{ borderRadius: 2, fontWeight: 700 }}>
          Ver más
        </Button>
      </CardActions>
    </Card>
  );
}; 