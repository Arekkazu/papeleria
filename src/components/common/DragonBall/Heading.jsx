import { Grid, Typography } from '@mui/material';

export const Heading = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        <Typography variant="h4" component="h2" align="center">
          Dragon Ball Characters
        </Typography>
      </Grid>
    </Grid>
  );
};
