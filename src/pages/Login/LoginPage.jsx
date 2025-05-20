import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
} from "@mui/material";
import Footer from "../../components/footer";
import BookBannerImg from "../../assets/images/book.jpg";
import { Navbar } from "../../components/navbar";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <header>
        <Navbar />
      </header>

      <main style={{ flex: 1 }}>
        <Box 
          sx={{
            backgroundColor: "#f5f5f5",
            py: 6,  
            px: 2,
            textAlign: "center",
            backgroundImage: `url(${BookBannerImg})`,
          }}
        >
          <Typography  sx={{color:'black', fontSize: { xs: "2.5rem", md: "3.5rem" }}}
          variant="h4">Mi Cuenta</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
            px: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 650,
              padding: 4,
            }}
          >
            {isLogin ? (
              <>
                <Typography variant="h6" gutterBottom>
                  Acceder
                </Typography>
                <TextField
                  fullWidth
                  label="Nombre de usuario o correo electrónico"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  type="password"
                  margin="normal"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Recuérdame"
                />
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Ingresar
                </Button>
                <Box textAlign="right" mt={1}>
                  <Button variant="text" size="small">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h6" gutterBottom>
                  Registrarse
                </Typography>
                <TextField
                  fullWidth
                  label="Dirección de correo electrónico"
                  margin="normal"
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Se enviará un enlace a tu dirección de correo electrónico para establecer una nueva contraseña.
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Tus datos personales se utilizarán para procesar tu pedido, mejorar tu experiencia en esta web, gestionar el acceso a tu cuenta y otros propósitos descritos en nuestra Política de privacidad.
                </Typography>
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Registrarse
                </Button>
              </>
            )}
            <Box textAlign="center" mt={2}>
              <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                  ? "¿No tienes cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </main>

      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
