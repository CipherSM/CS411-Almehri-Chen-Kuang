// src/components/Login.jsx
import React from "react";
import './Login.css'; // Import the CSS file for styles

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // Redirect user to Google login, this one needs to also be on the Google Cloud Console
    window.location.href = "http://localhost:5178/api/auth/google";
  };

  return (
    <div className="login-container">
      <h1 className="title">Current Events Dashboard</h1>
      {/* Button to handle login via Google OAuth */}
      <button onClick={handleGoogleLogin} className="login-button">Login with Google</button>
    </div>
  );
};

export default LoginPage;
