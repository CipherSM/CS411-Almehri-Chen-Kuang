// LogoutButton.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout} style={{ padding: "8px 16px", cursor: "pointer" }}>
      Logout
    </button>
  );
};

export default LogoutButton;
