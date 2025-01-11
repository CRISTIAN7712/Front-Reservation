import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      bgcolor="#333"
      color="white"
      py={2}
      textAlign="center"
      width="100%"
      sx={{
        marginTop: "auto",  
        position: "relative", 
      }}
    >
      <Typography variant="body2">© 2025 Gestor de compañias. Trabajo para Desarrollo Web UNIR.</Typography>
    </Box>
  );
}

export default Footer;
