import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../utils/helpers"; // Importación correcta

export const ProductCard = ({ product, onView, onAdd }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    onView?.();
    if (onAdd) onAdd();
  };

  return (
    <Card
      sx={{
        maxWidth: 260,
        m: "auto",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s",
        "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          bgcolor: "#f5f8fa",
          height: 180,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ objectFit: "contain", height: 180, width: "100%" }}
        />
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h6" align="center" fontWeight={700}>
          {product.name}
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          align="center"
          fontWeight={600}
        >
          {formatPrice(product.price)}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2, gap: 1 }}>
        <Button
          component={Link}
          to={`/products/${encodeURIComponent(product.name)}`}
          variant="outlined"
          size="medium"
          sx={{ borderRadius: 2, fontWeight: 700 }}
        >
          Ver más
        </Button>
        <Button
          variant="contained"
          size="medium"
          sx={{ borderRadius: 2, fontWeight: 700 }}
          onClick={handleAddToCart}
        >
          Añadir
        </Button>
      </CardActions>
    </Card>
  );
};
