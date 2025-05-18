import { CircularProgress, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";

export const Loading = () => {
  return (
    <Grid
      sx={{
        width: 500,
        height: 500,
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography 
        variant="h5"
        sx={{
          color: '#4a90e2',
          fontWeight: 500
        }}
      >
        Cargando...
      </Typography>
    </Grid>
  );
};
