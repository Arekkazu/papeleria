import {
  Card,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import imageHolder from "../../../assets/images/categories/imageHolder.png";

export const CardCategory = () => {
  return (
    <Card>
      <CardActionArea>
        <Box
          sx={{
            height: 180,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            image={imageHolder}
            alt="green iguana"
            sx={{
              height: 180,
              objectFit: "contain",
              mx: "auto",
              display: "block",
              p: 2,
            }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            Lizard
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
