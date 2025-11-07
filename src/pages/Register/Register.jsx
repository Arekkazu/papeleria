import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavBox } from "../../components/common/layouts/NavBarBox/NavBarBox";
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Link as MuiLink,
} from "@mui/material";
import { Navbar } from "../../components/navbar";
import Footer from "../../components/footer";
import { useAuth } from "../../context/AuthContext";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Limpiar error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Por favor ingresa un email válido");
      return;
    }

    setLoading(true);

    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        setSuccess(true);
        // Redirigir al dashboard o página principal después del registro
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(result.message || "Error al registrar usuario");
      }
    } catch (err) {
      console.error("Error al registrar:", err);
      setError(err.message || "Error al registrar usuario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header>
        <NavBox>
          <Navbar />
        </NavBox>
      </header>
      <main style={{ flex: 1 }}>
        <Box
          sx={{
            py: 8,
            backgroundColor: "#f5f8fa",
            minHeight: "calc(100vh - 200px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Container maxWidth="sm">
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 3,
                }}
              >
                Crear Cuenta
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  ¡Registro exitoso! Redirigiendo al login...
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  margin="normal"
                  required
                  disabled={loading}
                  autoComplete="username"
                />

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
                  autoComplete="new-password"
                  helperText="Mínimo 6 caracteres"
                />

                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  margin="normal"
                  required
                  disabled={loading}
                  autoComplete="new-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
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
                      Registrando...
                    </>
                  ) : (
                    "Registrarse"
                  )}
                </Button>

                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    ¿Ya tienes una cuenta?{" "}
                    <MuiLink
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={() => navigate("/login")}
                      sx={{ fontWeight: 600, cursor: "pointer" }}
                    >
                      Inicia sesión aquí
                    </MuiLink>
                  </Typography>
                </Box>
              </form>
            </Paper>
          </Container>
        </Box>
      </main>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};
