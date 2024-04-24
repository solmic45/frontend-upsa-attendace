//AuthController.tsx
import React, { useState, useEffect } from "react";
import {  useDispatch } from "react-redux";
 
import { checkAuthState } from "./CheckAuthState"; // Adjust the path
import '../styles/Loader.css'; // Import CSS for loader styling

const AuthController = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState(false);
 
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuthState(setChecking, setError, dispatch );
  }, [dispatch]);

  return (
    <div className="auth-controller">
      {!error ? (
        checking ? (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        ) : (
          children
        )
      ) : (
        "Error loading page!"
      )}
    </div>
  );
};

export default AuthController;
