import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import api from "../utils/api";
import Swal from 'sweetalert2'; // Import SweetAlert2

function TenantValidation() {
  const [tenantId, setTenantId] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [isValid, setIsValid] = useState(null);

  const validateTenant = async () => {
    try {
      const response = await api.get(`/api/tenants/validate`, {
        params: { tenantId },
        headers: { Authorization: apiKey },
      });
      setIsValid(true);

      // Success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Compañia valida!',
        text: 'La compañia es valida.',
        confirmButtonColor: '#00796b',
      });
    } catch {
      setIsValid(false);

      // Error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Compañia no valida.',
        text: 'La compañia o el Api Key no es valido.',
        confirmButtonColor: '#C0392B',
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        mt={5}
        p={3}
        borderRadius={2}
        boxShadow={12}
        bgcolor="rgba(34, 34, 34, 0.9)" // Dark background with transparency
        sx={{
          backdropFilter: "blur(10px)", // Blur effect
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "white", fontWeight: "bold" }}>
          Validar Compañia
        </Typography>

        <TextField
          fullWidth
          label="ID de compañia"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#00796b", // Focused border color
            },
            input: {
              color: "white", // Text color
            },
          }}
        />
        <TextField
          fullWidth
          label="API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#00796b", // Focused border color
            },
            input: {
              color: "white", // Text color
            },
          }}
        />

        <Button
          variant="contained"
          color="success"
          fullWidth
          onClick={validateTenant}
          sx={{
            mt: 2,
            backgroundColor: "#2c3e50", // Dark background
            "&:hover": {
              backgroundColor: "#34495e", // Darker background on hover
              boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
            },
            fontWeight: "bold", // Bold text
            textTransform: "uppercase", // Uppercase text
            letterSpacing: "1px", // Letter spacing
          }}
        >
          Validar
        </Button>
      </Box>
    </Container>
  );
}

export default TenantValidation;
