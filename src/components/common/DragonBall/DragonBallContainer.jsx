import { Box, Container } from '@mui/material';
import { Character } from './Character';
import { Heading } from './Heading';

export const DragonBallContainer = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Heading />
        <Character />
      </Box>
    </Container>
  );
}; 