import { styled } from "@mui/material/styles";
import { Card, CardContent, CardMedia, Typography, Box, Button } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  width: 600,
  height: 450,
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 300,
  },
}));

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  background: '#f5f5f5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(2),
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  width: 600,
  margin: '0 auto',
  textAlign: 'center',
  padding: theme.spacing(2, 0, 0, 0),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
  '& .MuiTypography-h4': {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(1),
  },
  '& .MuiTypography-h5': {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(2),
  },
}));

export const NavigationButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  justifyContent: 'center',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  minWidth: 120,
  padding: theme.spacing(1, 3),
}));

export const CharacterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
})); 