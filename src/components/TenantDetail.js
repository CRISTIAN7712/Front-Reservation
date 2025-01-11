import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import api from "../utils/api";

function TenantDetail() {
  const { id } = useParams();
  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    const fetchTenant = async () => {
      const response = await api.get(`/api/tenants/${id}`);
      setTenant(response.data);
    };

    fetchTenant();
  }, [id]);

  if (!tenant) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} borderRadius={2} boxShadow={3} bgcolor="#f9f9f9">
        <Typography variant="h4" align="center" gutterBottom>
          {tenant.name}
        </Typography>
        <Typography variant="body1">Email: {tenant.email}</Typography>
        <Typography variant="body1">Phone: {tenant.phone}</Typography>
        <Typography variant="body1">Tenant ID: {tenant.tenantId}</Typography>
      </Box>
    </Container>
  );
}

export default TenantDetail;
