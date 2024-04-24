import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Form from './pages/Form';
import backgroundImage from './assets/campus-13.jpg'; // Import the background image
import './App.css';
import AuthController from './utils/AuthController';
import AdminForm from './pages/AdminForm';


const Router = () => {
  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <BrowserRouter >

    <Routes>
    <Route path="/" element={<AuthController><Landing /></AuthController>} exact/>
      <Route
        path="login"
        element={<Login />} exact
      />
      <Route path="/signup" element={<Signup />} exact />
      <Route path="/form" element={ <AuthController><Form /></AuthController>} exact />
      <Route path="/all-forms" element={ <AuthController><AdminForm /></AuthController>} exact />

   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default Router