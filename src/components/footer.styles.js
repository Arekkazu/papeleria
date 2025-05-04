import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton, Link } from "@mui/material";

export const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#FAF6EB",
  color: "#3F5D7D",
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  borderTop: `2px solid #8CB7D1`,
}));

export const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  color: "#3F5D7D",
  textDecoration: "none",
  "&:hover": {
    color: "#8CB7D1",
  },
}));

export const FooterIconButton = styled(IconButton)(({ theme }) => ({
  color: "#3F5D7D",
  "&:hover": {
    color: "#8CB7D1",
  },
}));

export const LogoImg = styled("img")(({ theme }) => ({
  width: "50px",
  height: "auto",
  borderRadius: "8px",
}));
