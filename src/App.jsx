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
              className="image-logo"
              src="/public/logo.jpg"
              alt="Logo papeleria"
            />
          </div>
          <div className="search">
            <label htmlFor="search">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3721/3721746.png"
                alt="icono lupa"
              />
            </label>
            <input type="text" />
          </div>
          <nav className="navbar-links">
            <a href="#">Inicio</a>
            <a href="#">Productos</a>
            <a href="#">Carrito</a>
            <a href="#">Nosotros</a>
            <a href="#">Iniciar sesión</a>
          </nav>
        </header>

        <main className="main-content">
          <h1>Productos Destacados</h1>
          <p>Encuentra los mejores productos al mejor precio</p>

          <div className="content-products">
            <div className="filter-product">
              <p>Filtros producto</p>
            </div>
            <div className="views-product">
              <div></div>
              <p>Vista producto</p>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Papelería. Todos los derechos reservados.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
