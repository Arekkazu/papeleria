import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardCategory } from "./CardCategory";
export const DiscoverCategory = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography gutterBottom variant="h4" align="center">
        Explora Nuestras Categorías
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        sx={{
          padding: "1rem",
        }}
      >
        <Grid xs={12} sm={6} md={2}>
          <CardCategory />
        </Grid>
        <Grid xs={12} sm={6} md={2}>
          <CardCategory />
        </Grid>
        <Grid xs={12} sm={6} md={2}>
          <CardCategory />
        </Grid>
        <Grid xs={12} sm={6} md={2}>
          <CardCategory />
        </Grid>
        <Grid xs={12} sm={6} md={2}>
          <CardCategory />
        </Grid>
      </Grid>
    </Box>
  );
};
