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
  const { isAuthenticated, user } = useContext(AuthContext);
  const showWelcome = useWelcomeScreen();
  const [welcomeComplete, setWelcomeComplete] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("");

  const handleWelcomeExit = () => {
    console.log("Exiting welcome screen.");
    setWelcomeComplete(true);
  };

  const topics = [
    "Technology",
    "Business",
    "Environment",
    "Entertainment",
    "Sport",
  ];

return (
  <div style={{ position: "relative", minHeight: "100vh" }}> {/* Ensure container is relative */}
    {showWelcome && !welcomeComplete ? (
      <WelcomeScreen firstName={user?.firstName} onExit={handleWelcomeExit} />
    ) : (
      isAuthenticated && (
        <>
          <div className="header-area flex items-center" style={{ justifyContent: "space-between", padding: "10px 20px" }}>
            <TimeSection />
            <div className="buttons-container flex justify-center space-x-2">
              {topics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSelectedTopic(topic)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  {topic}
                </button>
              ))}
            </div>
            <LogoutButton />
          </div>
          <div className="content-area flex">
            <div className="weather-box">
              <Weather />
            </div>
            <div className="top-stories-container">
              <TopStories selectedTopic={selectedTopic} />
            </div>
          </div>
        </>
      )
    )}
  </div>
);

};
export default Home;