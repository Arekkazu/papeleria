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
        height: 240,
        borderRadius: 3,
        boxShadow: 2,
        transition: "transform 0.2s",
        m: "auto",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 5,
        },
      }}
    >
      <CardActionArea
        onClick={handleCategoryClick}
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            height: 160,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f5f8fa",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{
              objectFit: "contain",
              width: "90%",
              height: "90%",
              p: 1,
            }}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            align="center"
            fontWeight={700}
            sx={{
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
