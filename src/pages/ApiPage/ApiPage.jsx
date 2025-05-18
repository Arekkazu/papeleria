import { ApiContainer } from "./ApiPage.styles";
import { Box, Typography } from "@mui/material";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
import { DragonBallContainer } from "../../components/common/DragonBall/DragonBallContainer";

const ApiPage = () => {
  return (
    <ApiContainer>
      <header>
        <Navbar />
      </header>

      <main style={{ flex: 1 }}>
        <Box sx={{ py: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            sx={{ mb: 4 }}
          >
            Dragon Ball Characters
          </Typography>
          <DragonBallContainer />
        </Box>
      </main>

      <footer>
        <Footer />
      </footer>
    </ApiContainer>
  );
};

export default ApiPage; 