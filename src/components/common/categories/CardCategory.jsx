import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  CardContent,
  Box,
} from "@mui/material";

export const CardCategory = ({ name = "Categoría", image }) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 5 } }}>
      <CardActionArea>
        <Box
          sx={{
            height: 160,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: '#f5f8fa',
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={name}
            sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div" align="center" fontWeight={700}>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
