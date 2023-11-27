import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './LandingPage.tsx';
import '../styling/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Recipe from './Recipe.tsx';
import MyFavorites from './MyFavorites.tsx';
import MyRatings from './MyRatings.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/project2/" element={<LandingPage />} />
        <Route path="/project2/:recipeId" element={<Recipe />} />
        <Route path="/project2/MyFavorites" element={<MyFavorites />} />
        <Route path="/project2/MyRatings" element={<MyRatings />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
