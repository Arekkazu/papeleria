import { Box } from "@mui/material";

export const FooterBox = ({ children }) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        p: 2,
        textAlign: "center",
      }}
    >
      {children || "Este es el footer"}
    </Box>
  );
};
