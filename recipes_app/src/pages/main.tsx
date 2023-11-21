import ReactDOM from 'react-dom/client';
import LandingPage from './LandingPage.tsx';
import '../styling/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar.tsx';
import Recipe from './Recipe.tsx';
import MyFavorites from './MyFavorites.tsx';
import MyRatings from './MyRatings.tsx';
import React from 'react';
import store from '../store.js';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:recipeId" element={<Recipe />} />
          <Route path="/MyFavorites" element={<MyFavorites />} />
          <Route path="/MyRatings" element={<MyRatings />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
);
