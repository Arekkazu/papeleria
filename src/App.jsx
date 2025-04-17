// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div className="app-container">
        <header className="navbar">
          <div className="navbar-logo">
            <img
              className="logoImg"
              src="/public/image.png"
              alt="Logo papeleria"
            />
          </div>
          <nav className="navbar-links">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Carrito</a>
            <a href="#">Nosotros</a>
            <a href="#">Iniciar sesión</a>
            <a href="#">Registrarse</a>
          </nav>
        </header>

        <main className="main-content">
          <p>Contenido pagina</p>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Papelería. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
