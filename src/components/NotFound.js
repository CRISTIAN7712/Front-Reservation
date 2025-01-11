import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#2c3e50",
        color: "white",
        textAlign: "center",
        backgroundImage: "url('https://source.unsplash.com/1600x900/?error,404')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backdropFilter: "blur(8px)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          maxWidth: "80%",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ marginBottom: 3, fontStyle: "italic" }}>
          Oops! The page you're looking for does not exist.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{
            fontSize: "1.2rem",
            padding: "12px 24px",
            "&:hover": {
              backgroundColor: "#27ae60",
            },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
