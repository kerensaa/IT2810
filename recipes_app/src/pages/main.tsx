import React from 'react'
import ReactDOM from 'react-dom/client'
import '../styling/index.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from './LandingPage.tsx'
import Navbar from '../components/Navbar.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
      </Routes>
    </Router>
  </React.StrictMode>,
)
