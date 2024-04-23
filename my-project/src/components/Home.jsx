// src/components/Home.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";
import WelcomeScreen from "./WelcomeScreen";
import TimeSection from "./TimeSection";
import TopStories from "./TopStories";
import Weather from "./Weather";
import useWelcomeScreen from "../hooks/useWelcomeScreen";

const Home = () => {
  const { isAuthenticated, user } = useContext(AuthContext); // Access user here
  const showWelcome = useWelcomeScreen();
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  const handleWelcomeExit = () => {
    console.log("Exiting welcome screen.");
    setWelcomeComplete(true);
  };

  return (
    <>
      {showWelcome && !welcomeComplete ? (
        <WelcomeScreen firstName={user?.firstName} onExit={handleWelcomeExit} />
      ) : (
        isAuthenticated && (
          <>
            <div style={{ position: "absolute", top: "10px", right: "10px" }}>
              <LogoutButton />
            </div>
            <TimeSection />
            <TopStories />
            <Weather />
          </>
        )
      )}
    </>
  );
};

export default Home;
