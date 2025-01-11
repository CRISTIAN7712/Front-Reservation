import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import api from "../utils/api";
import Swal from 'sweetalert2'; // Import SweetAlert2

function TenantForm() {
  const [tenant, setTenant] = useState({
    name: "",
    email: "",
    phone: "",
    dbType: "postgresql", // Default database type
    dbUrl: "",
    dbPort: "",
    dbName: "",
    dbUsername: "",
    dbPassword: "",
  });

  // Create dbUrl from the provided info
  const generateDbUrl = () => {
    const { dbType, dbPort, dbName } = tenant;
    return `${dbType}://localhost:${dbPort}/${dbName}`;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbUrl = generateDbUrl(); // Generate dbUrl before submitting the form

    const tenantData = { ...tenant, dbUrl }; // Add dbUrl to tenant data

    try {
      await api.post("/api/tenants", tenantData);
      
      // Show success alert using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso!!',
        text: 'Compañia creada con exito!',
        confirmButtonColor: '#00796b'
      });

      setTenant({
        name: "",
        email: "",
        phone: "",
        dbType: "postgresql",
        dbUrl: "",
        dbPort: "",
        dbName: "",
        dbUsername: "",
        dbPassword: "",
      });
    } catch (error) {
      console.error("Error creating tenant:", error);

      // Show error alert using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear la compañia. Por favor inténtalo de nuevo.',
        confirmButtonColor: '#C0392B'
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
          Creacion de Nueva Compañia
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Nombre"
            value={tenant.name}
            onChange={(e) => setTenant({ ...tenant, name: e.target.value })}
            sx={{
              input: {
                color: "white", // Text color
              },
              "& .MuiInputLabel-root": {
                color: "white", // Label color
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b", // Focus border color
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Correo"
            type="email"
            value={tenant.email}
            onChange={(e) => setTenant({ ...tenant, email: e.target.value })}
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Telefono"
            value={tenant.phone}
            onChange={(e) => setTenant({ ...tenant, phone: e.target.value })}
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />

          {/* Database Type Selector */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Tipo de Database</InputLabel>
            <Select
              value={tenant.dbType}
              onChange={(e) => setTenant({ ...tenant, dbType: e.target.value })}
              label="Database Type"
              sx={{
                color: "white",
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiSelect-icon": {
                  color: "white",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796b", // Border color
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#00796b", // Hover border color
                },
              }}
            >
              <MenuItem value="postgresql">PostgreSQL</MenuItem>
              <MenuItem value="mysql">MySQL</MenuItem>
              <MenuItem value="mongodb">MongoDB</MenuItem>
            </Select>
          </FormControl>

          {/* Fields to complete dbUrl */}
          <TextField
            fullWidth
            margin="normal"
            label="Puerto Database"
            value={tenant.dbPort}
            onChange={(e) => setTenant({ ...tenant, dbPort: e.target.value })}
            type="number"
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nombre Database"
            value={tenant.dbName}
            onChange={(e) => setTenant({ ...tenant, dbName: e.target.value })}
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />

          {/* Database username and password fields */}
          <TextField
            fullWidth
            margin="normal"
            label="Usuario Database"
            value={tenant.dbUsername}
            onChange={(e) => setTenant({ ...tenant, dbUsername: e.target.value })}
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Contraseña Database"
            type="password"
            value={tenant.dbPassword}
            onChange={(e) => setTenant({ ...tenant, dbPassword: e.target.value })}
            sx={{
              input: {
                color: "white",
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "#00796b",
              },
            }}
          />

          {/* Button with hover effect */}
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#2c3e50", // Dark color
              "&:hover": {
                backgroundColor: "#34495e", // Darker color on hover
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
              },
              fontWeight: "bold", // Highlighted text
              textTransform: "uppercase", // Uppercase text
              letterSpacing: "1px", // Letter spacing
            }}
          >
            Crear Compañia
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default TenantForm;
