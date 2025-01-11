import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#121212", // Fondo oscuro
        boxShadow: 12, // Sombra más intensa
        backdropFilter: "blur(15px)", // Desenfoque de fondo
        transition: "background-color 0.3s ease-in-out", // Transición de fondo
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Gestion de Compañias
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            width: "100%",
            flexWrap: "wrap",
          }}
        >
          {/* Botones de navegación */}
          {[
            { to: "/", label: "Inicio" },
            { to: "/tenants", label: "Compañias" },
            { to: "/create-tenant", label: "Crear Compañia" },
            { to: "/search", label: "Buscar Compañia" },
            { to: "/validate", label: "Validar Compañia" },
            { to: "/delete-tenant", label: "Eliminar Compañia" },
          ].map((button) => (
            <Button
              key={button.to}
              component={Link}
              to={button.to}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "#34495e", // Efecto hover: gris oscuro
                  transform: "scale(1.05)", // Aumento el tamaño del botón
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Sombra más sutil
                },
                transition: "all 0.3s ease, transform 0.2s ease",
                padding: "12px 24px", // Tamaño más grande
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "1px",
                borderRadius: "50px", // Bordes redondeados
                fontFamily: "Roboto, sans-serif", // Fuente consistente
              }}
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
