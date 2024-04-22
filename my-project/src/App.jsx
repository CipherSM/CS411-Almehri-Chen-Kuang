// App.jsx

import React, { useContext, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import useLenis from "./hooks/useLenis";
import LoginPage from "./components/Login";
import HomePage from "./components/Home";

function App() {
  const { isAuthenticated } = useContext(AuthContext); // get the isAuthenticated state from the context

  useLenis(); // this is for smooth scroll

  return (
    <Router>
      <NavigationHandler isAuthenticated={isAuthenticated} />
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/"
            element={
              <Navigate replace to={isAuthenticated ? "/home" : "/login"} /> // if authenticated, redirect to home, else redirect to login
            }
          />
          <Route
            path="*"
            element={
              <Navigate replace to={isAuthenticated ? "/home" : "/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

function NavigationHandler({ isAuthenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return null; // This component does not render anything
}

export default App;
