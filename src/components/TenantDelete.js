import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { Button, Select, MenuItem, FormControl, InputLabel, TextField, Box, Typography, Card, CardContent } from "@mui/material";
import Swal from "sweetalert2"; // Importar SweetAlert2

function TenantDelete() {
  const [tenants, setTenants] = useState([]);
  const [selectedTenant, setSelectedTenant] = useState("");
  const [tenantDetails, setTenantDetails] = useState({
    name: "",
    email: "",
    phone: "",
    tenantId: "",
    apiKey: ""
  });
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await api.get("/api/tenants");
      setTenants(response.data);
    };
    fetchTenants();
  }, []);

  useEffect(() => {
    if (selectedTenant) {
      const tenant = tenants.find((tenant) => tenant.id === parseInt(selectedTenant));
      setTenantDetails({
        name: tenant.name,
        email: tenant.email,
        phone: tenant.phone,
        tenantId: tenant.tenantId,
        apiKey: tenant.apiKey
      });
    } else {
      setTenantDetails({
        name: "",
        email: "",
        phone: "",
        tenantId: "",
        apiKey: ""
      });
      setShowApiKey(false);
    }
  }, [selectedTenant, tenants]);

  const handleDelete = async () => {
    if (selectedTenant) {
      try {
        await api.delete(`/api/tenants/${selectedTenant}`);
        
        // Mostrar alerta de éxito con SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Compañia Eliminada",
          text: "La comañia fue eliminada con exito.",
          confirmButtonText: "OK",
          background: "#2c3e50",
          color: "#fff",
          confirmButtonColor: "#34495e",
        });

        setSelectedTenant("");
        setTenantDetails({
          name: "",
          email: "",
          phone: "",
          tenantId: "",
          apiKey: ""
        });
      } catch (error) {
        console.error("Error deleting tenant:", error);
        
        // Mostrar alerta de error con SweetAlert2
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Se produjo un error al eliminar la compañia. Inténtelo de nuevo más tarde.",
          confirmButtonText: "OK",
          background: "#2c3e50",
          color: "#fff",
          confirmButtonColor: "#e74c3c",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        margin: "auto",
        padding: 3,
        backgroundColor: "rgba(34, 34, 34, 0.9)",
        borderRadius: 3,
        boxShadow: 24,
        backdropFilter: "blur(15px)",
        transition: "background-color 0.3s ease-in-out",
        border: "1px solid #333", // Borde sutil alrededor del contenedor
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ color: "white", fontWeight: 600, fontFamily: "Roboto, sans-serif" }}>
        Eliminar Compañia
      </Typography>
      
      <FormControl fullWidth margin="normal">
        <InputLabel sx={{ color: "white" }}>Seleccionar Compañia</InputLabel>
        <Select
          value={selectedTenant}
          onChange={(e) => setSelectedTenant(e.target.value)}
          label="Seleccione una compañia"
          sx={{
            color: "white",
            backgroundColor: "#2C3E50",
            "& .MuiInputLabel-root": {
              color: "white",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#00796b",
              },
              "&:hover fieldset": {
                borderColor: "#00796b",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#00796b",
              },
            },
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {tenants.map((tenant) => (
            <MenuItem key={tenant.id} value={tenant.id}>
              {tenant.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedTenant && (
        <Card sx={{ mt: 3, bgcolor: "white", p: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <TextField
              label="Nombre Compañia"
              fullWidth
              margin="normal"
              value={tenantDetails.name}
              disabled
              sx={{
                input: { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
                "& .MuiOutlinedInput-root": { borderColor: "#00796b" },
              }}
            />
            <TextField
              label="Correo"
              fullWidth
              margin="normal"
              value={tenantDetails.email}
              disabled
              sx={{
                input: { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
              }}
            />
            <TextField
              label="Telefono"
              fullWidth
              margin="normal"
              value={tenantDetails.phone}
              disabled
              sx={{
                input: { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
              }}
            />
            <TextField
              label="ID de Compañia"
              fullWidth
              margin="normal"
              value={tenantDetails.tenantId}
              disabled
              sx={{
                input: { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
              }}
            />
            <TextField
              label="API Key"
              fullWidth
              margin="normal"
              value={showApiKey ? tenantDetails.apiKey : "*************"}
              disabled
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    onClick={() => setShowApiKey(!showApiKey)}
                    sx={{
                      color: "black",
                      borderColor: "#00796b",
                      "&:hover": {
                        borderColor: "#00796b",
                        backgroundColor: "#00796b",
                      },
                    }}
                  >
                    {showApiKey ? "Ocultar" : "Mostrar"}
                  </Button>
                ),
              }}
              sx={{
                input: { color: "black" },
                "& .MuiInputLabel-root": { color: "black" },
              }}
            />
          </CardContent>
        </Card>
      )}

      <Button
        variant="contained"
        color="error"
        onClick={handleDelete}
        sx={{
          mt: 3,
          backgroundColor: "#C0392B", 
          "&:hover": {
            backgroundColor: "#E74C3C",
          },
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          padding: "10px 20px", // Aumentar padding para un botón más grande
          borderRadius: 3, // Bordes redondeados
        }}
        disabled={!selectedTenant}
      >
        Eliminar Compañia
      </Button>
    </Box>
  );
}

export default TenantDelete;
