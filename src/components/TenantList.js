import React, { useEffect, useState } from "react";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, TextField, IconButton, InputAdornment } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import Swal from "sweetalert2"; // Importa SweetAlert2

function TenantList() {
  const [tenants, setTenants] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [tenantData, setTenantData] = useState({
    name: "",
    email: "",
    phone: "",
    dbUrl: "",
    dbUsername: "",
    dbPassword: "",
    tenantId: "",
    apiKey: "",
  });
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    const fetchTenants = async () => {
      const response = await api.get("/api/tenants");
      setTenants(response.data);
    };

    fetchTenants();
  }, []);

  const handleOpen = (tenant) => {
    setSelectedTenant(tenant);
    setTenantData({
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      dbUrl: tenant.dbUrl,
      dbUsername: tenant.dbUsername,
      dbPassword: tenant.dbPassword,
      tenantId: tenant.tenantId,
      apiKey: tenant.apiKey,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(false); // Reset editing state
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    setTenantData({
      ...tenantData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/tenants/${selectedTenant.id}`, tenantData);
      setOpen(false);
      setEditing(false);

      // Mostrar alerta de éxito con SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Compañia actualizada con exito!",
        text: "Los detalles de la compañia fueron actualizados.",
        confirmButtonText: "OK",
        background: "#2c3e50",
        color: "#fff",
        confirmButtonColor: "#34495e",
      });
    } catch (error) {
      console.error("Error updating tenant:", error);

      // Mostrar alerta de error con SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error al actualizar la compañia",
        text: "Se produjo un error al actualizar la compañia. Inténtelo de nuevo más tarde.",
        confirmButtonText: "OK",
        background: "#2c3e50",
        color: "#fff",
        confirmButtonColor: "#e74c3c",
      });
    }
  };

  const handleToggleApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <Container>
      <TableContainer component={Paper} sx={{ mt: 5, borderRadius: 2, boxShadow: 12, bgcolor: "rgba(34, 34, 34, 0.9)", backdropFilter: "blur(10px)" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>#</TableCell>
              <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>Compañia</TableCell>
              <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>Correo</TableCell>
              <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>Telefono</TableCell>
              <TableCell sx={{ color: "#e0e0e0", fontWeight: 600 }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tenants.map((tenant, index) => (
              <TableRow key={tenant.id}>
                <TableCell sx={{ color: "#b0b0b0" }}>{index + 1}</TableCell>
                <TableCell sx={{ color: "#b0b0b0" }}>{tenant.name}</TableCell>
                <TableCell sx={{ color: "#b0b0b0" }}>{tenant.email}</TableCell>
                <TableCell sx={{ color: "#b0b0b0" }}>{tenant.phone}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(tenant)}
                    sx={{
                      backgroundColor: "#2c3e50",
                      "&:hover": {
                        backgroundColor: "#34495e",
                        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
                      },
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      letterSpacing: "1.5px",
                      borderRadius: "50px",
                      padding: "10px 20px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Tenant Details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            margin: "100px auto",
            backgroundColor: "white",
            padding: 3,
            borderRadius: "8px",
            boxShadow: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <h2 style={{ color: "#333" }}>{editing ? "Editar Compañia" : "Detalles de Compañia"}</h2>
            <IconButton onClick={handleClose} sx={{ color: "red" }}>
              <Close />
            </IconButton>
          </Box>
          <TextField
            label="ID Compañia"
            variant="outlined"
            fullWidth
            name="tenantId"
            value={tenantData.tenantId}
            disabled
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="API Key"
            variant="outlined"
            fullWidth
            name="apiKey"
            value={tenantData.apiKey}
            disabled
            type={showApiKey ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleApiKey}>
                    {showApiKey ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Compañia"
            variant="outlined"
            fullWidth
            name="name"
            value={tenantData.name}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Correo"
            variant="outlined"
            fullWidth
            name="email"
            value={tenantData.email}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Telefono"
            variant="outlined"
            fullWidth
            name="phone"
            value={tenantData.phone}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="DB URL"
            variant="outlined"
            fullWidth
            name="dbUrl"
            value={tenantData.dbUrl}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="DB Username"
            variant="outlined"
            fullWidth
            name="dbUsername"
            value={tenantData.dbUsername}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="DB Password"
            variant="outlined"
            fullWidth
            name="dbPassword"
            value={tenantData.dbPassword}
            onChange={handleChange}
            disabled={!editing}
            sx={{ marginBottom: 2 }}
          />

          {editing ? (
            <>
              <Button
                onClick={handleSave}
                variant="contained"
                color="primary"
                sx={{
                  marginRight: 1,
                  backgroundColor: "#2c3e50",
                  "&:hover": {
                    backgroundColor: "green",
                  },
                }}
              >
                Guardar
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary"
                sx={{
                  backgroundColor: "red",
                  "&:hover": {
                    backgroundColor: "tomato",
                  },
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEditClick}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#2c3e50",
                "&:hover": {
                  backgroundColor: "#34495e",
                },
              }}
            >
              Editar
            </Button>
          )}
        </Box>
      </Modal>
    </Container>
  );
}

export default TenantList;
