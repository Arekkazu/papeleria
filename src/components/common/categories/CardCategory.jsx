import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CardCategory = ({ name = "Categoría", image }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/products?category=${encodeURIComponent(name)}`);
  };

  return (
    <Card
      sx={{
        width: 260,
        height: 260,
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.2s",
        m: "auto",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 5,
        },
      }}
    >
      <CardActionArea
        onClick={handleCategoryClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Contenedor de la imagen */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              objectFit: "cover",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        </Box>

        {/* Texto superpuesto */}
        <CardContent
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(238, 233, 233, 0.7)",
            p: 2,
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight={700}
            sx={{
              color: "rgba(0,0,0,0.5)",
              lineHeight: 1.2,
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
