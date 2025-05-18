import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CardCategory } from "./CardCategory";

const categories = {
  Escolar:
    "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Oficina:
    "https://poweredbyorange.com/wp-content/uploads/2019/09/Desk-Clutter-201908-003-720x475.jpg",
  "Papeles y Formatos":
    "https://img.freepik.com/free-photo/still-life-stacks-papers-documents_23-2151118315.jpg?t=st=1746977767~exp=1746981367~hmac=448e0bc761f5bdfd22d669ded6c8b21a133c168e13a0a17482379990716e7e08",
  "Archivado y Organización":
    "https://img.freepik.com/free-photo/ring-binder-used-stored-documents_23-2149362573.jpg?t=st=1746977805~exp=1746981405~hmac=a67a0537bff96335254d8f7399bacb3201addf9c704f8a4f6e1ac9dc7d984eaa",
  "Arte y Dibujo Técnico":
    "https://images.unsplash.com/photo-1616627981431-ed306bb11ac0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "Adhesivos y Corrección":
    "https://img.freepik.com/free-photo/crop-hands-sealing-box_23-2147758728.jpg?t=st=1746978999~exp=1746982599~hmac=993b752adf7ef18b4e15e38249912f395a6efbb13e8748225f6ffd2d7a8b667c",
};
export const DiscoverCategory = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 6,
        px: 2,
      }}
    >
      <Typography gutterBottom variant="h4" align="center" fontWeight={700}>
        Explora nuestras categorías
      </Typography>

      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Encuentra todo lo que necesitas para tu día a día escolar y de oficina
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{
          maxWidth: "1400px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {Object.entries(categories).map(([name, image]) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={name}
            sx={{
              display: "flex",
              justifyContent: "center",
              minHeight: 260,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 260,
                height: "100%",
                display: "flex",
              }}
            >
              <CardCategory name={name} image={image} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
