// Login.jsx

import React from "react";

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // Redirect user to Google login, this one needs to also be on the google cloud console
    window.location.href = "http://localhost:5178/api/auth/google";
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Button to handle login via Google OAuth */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
