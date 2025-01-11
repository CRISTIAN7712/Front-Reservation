import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container maxWidth="md">
      <Box
        mt={8}
        p={6}
        borderRadius={4}
        boxShadow={12}
        bgcolor="rgba(34, 34, 34, 0.9)"
        color="white"
        sx={{
          backdropFilter: "blur(15px)",
          textAlign: "center",
          transition: "background-color 0.3s ease-in-out",
          "@media (max-width: 600px)": { p: 4 },
        }}
      >
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: 700,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#e0e0e0",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Bienvenido al Gestor de Compañias
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            mb: 4,
            fontWeight: 300,
            fontSize: "1.1rem",
            letterSpacing: "1px",
            color: "#b0b0b0",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          Administre compañias con facilidad usando esta aplicación. Explora las características
          para crear, buscar y validar inquilinos sin esfuerzo.
        </Typography>

        {/* Botón View Tenants */}
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/tenants"
          sx={{
            mx: 2,
            backgroundColor: "#2c3e50",
            "&:hover": {
              backgroundColor: "#34495e",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              transform: "scale(1.05)", 
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            borderRadius: "50px",
            padding: "12px 24px",
            transition: "all 0.3s ease, transform 0.2s ease",
            fontFamily: "Roboto, sans-serif",
          }}
          aria-label="View Tenants"
        >
          Mostrar Compañias
        </Button>

        {/* Botón Create Tenant */}
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/create-tenant"
          sx={{
            mx: 2,
            backgroundColor: "darkslategray",
            "&:hover": {
              backgroundColor: "darkseagreen",
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              transform: "scale(1.05)",
            },
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            borderRadius: "50px",
            padding: "12px 24px",
            transition: "all 0.3s ease, transform 0.2s ease",
            fontFamily: "Roboto, sans-serif",
          }}
          aria-label="Create Tenant"
        >
          Crear Compañia
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
