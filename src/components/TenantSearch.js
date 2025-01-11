import React, { useState } from "react";
import { Container, TextField, Radio, RadioGroup, FormControlLabel, Button, Typography, Box, Card, CardContent } from "@mui/material";
import api from "../utils/api";
import Swal from 'sweetalert2'; // Import SweetAlert2

function TenantSearch() {
  const [searchType, setSearchType] = useState("tenantId");
  const [searchValue, setSearchValue] = useState("");
  const [tenant, setTenant] = useState(null);

  const handleSearch = async () => {
    let url = searchType === "tenantId"
      ? `/api/tenants/search?tenantId=${searchValue}`
      : `/api/tenants/searchByApiKey?apiKey=${searchValue}`;

    try {
      const response = await api.get(url);
      setTenant(response.data);

      // Success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Compañia Encontrada',
        text: `Nombre de Compañia: ${response.data.name}`,
        confirmButtonColor: '#00796b',
      });
    } catch {
      setTenant(null);

      // Error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Compañia no encontrada. Por favor intente de nuevo.',
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
          Buscar Compañia
        </Typography>

        <RadioGroup
          row
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          sx={{
            mb: 2,
            color: "white", // Ensure the text is white
            "& .MuiFormControlLabel-root": {
              color: "white", // Set radio controls to white
            },
            "& .MuiFormControlLabel-label": {
              color: "white", // Set labels to white
            },
          }}
        >
          <FormControlLabel value="tenantId" control={<Radio />} label="Por ID de Compañia" />
          <FormControlLabel value="apiKey" control={<Radio />} label="Por API Key" />
        </RadioGroup>

        <TextField
          fullWidth
          label="Ingrese el valor de busqueda"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            mb: 2,
            "& .MuiInputLabel-root": {
              color: "white", // Label color
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#00796b", // Focus border color
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
          onClick={handleSearch}
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
          Buscar
        </Button>

        {tenant && (
          <Card sx={{ mt: 3, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
            <CardContent>
              <Typography variant="h6" sx={{ color: "white" }}>Compañia</Typography>
              <Typography sx={{ color: "white" }}>Nombre: {tenant.name}</Typography>
              <Typography sx={{ color: "white" }}>Correo: {tenant.email}</Typography>
              <Typography sx={{ color: "white" }}>Telefono: {tenant.phone}</Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
}

export default TenantSearch;
