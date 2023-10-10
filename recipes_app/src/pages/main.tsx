import React from "react";
import ReactDOM from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import "../styling/index.css";
import LandingPage from "./LandingPage.tsx";
import Recipe from "./Recipe.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:recipeId" element={<Recipe />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
