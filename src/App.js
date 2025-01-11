import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import TenantList from "./components/TenantList";
import TenantForm from "./components/TenantForm";
import TenantDetail from "./components/TenantDetail";
import About from "./components/About";
import NotFound from "./components/NotFound";
import TenantSearch from "./components/TenantSearch";
import TenantValidation from "./components/TenantValidation";
import TenantDelete from "./components/TenantDelete"; // Importa el componente de eliminación
import Footer from "./components/Footer"; // Asegúrate de que el Footer esté importado

import "./components/styles.css";

function App() {
  return (
    <Router>
      <Navigation />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tenants" element={<TenantList />} />
          <Route path="/create-tenant" element={<TenantForm />} />
          <Route path="/tenant/:id" element={<TenantDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/search" element={<TenantSearch />} />
          <Route path="/validate" element={<TenantValidation />} />
          <Route path="/delete-tenant" element={<TenantDelete />} />
        </Routes>
        <Footer /> {/* El Footer se coloca al final */}
      </div>
    </Router>
  );
}

export default App;
