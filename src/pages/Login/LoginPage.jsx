import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Paper,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import Footer from "../../components/footer";
import BookBannerImg from "../../assets/images/book.jpg";
import { Navbar } from "../../components/navbar";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../hooks/useCart";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { syncCartWithServer } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!formData.email || !formData.password) {
      setError("Email y contraseña son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);

      if (result.success) {
        // Sincronizar carrito local con el servidor
        await syncCartWithServer();
        
        // Redirigir a la página principal
        navigate("/");
      } else {
        setError(result.message || "Credenciales incorrectas");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.message || "Credenciales incorrectas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Typography  
            sx={{
              color: 'black', 
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(255,255,255,0.8)",
            }}
            variant="h4"
          >
            Mi Cuenta
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 6,
            px: 2,
            backgroundColor: "#f5f8fa",
            minHeight: "calc(100vh - 300px)",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: "100%",
              maxWidth: 500,
              padding: 4,
              borderRadius: 3,
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              Iniciar Sesión
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
                autoComplete="email"
              />
              
              <TextField
                fullWidth
                label="Contraseña"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={loading}
                autoComplete="current-password"
              />
              
              <FormControlLabel
                control={
                  <Checkbox 
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={loading}
                  />
                }
                label="Recuérdame"
                sx={{ mt: 1 }}
              />
              
              <Button 
                type="submit"
                variant="contained" 
                fullWidth 
                size="large"
                disabled={loading}
                sx={{ 
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: 16,
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1 }} />
                    Ingresando...
                  </>
                ) : (
                  "Ingresar"
                )}
              </Button>
              
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  ¿No tienes cuenta?{" "}
                  <MuiLink
                    component="button"
                    type="button"
                    variant="body2"
                    onClick={() => navigate("/register")}
                    sx={{ fontWeight: 600, cursor: "pointer" }}
                  >
                    Regístrate aquí
                  </MuiLink>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Box>
      </main>

      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
