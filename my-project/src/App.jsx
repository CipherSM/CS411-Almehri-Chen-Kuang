import React, { useEffect, useState } from "react";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import useLenis from "./hooks/useLenis";
import useWelcomeScreen from "./hooks/useWelcomeScreen";
import CustomCursor from "./components/CustomCursor";
import WelcomeScreen from "./components/WelcomeScreen";
import HelloSection from "./components/HelloSection";
import TopStories from "./components/TopStories";

function App() {
  const showWelcome = useWelcomeScreen();
  const [showMainContent, setShowMainContent] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");

  useLenis();
  const handleWelcomeExit = () => {
    // Triggered when WelcomeScreen has finished its exit animation
    setShowMainContent(true);
  };
  useEffect(() => {
    const handleMouseOver = (event) => {
      // Change cursor when hovering over text elements
      if (
        event.target.tagName === "P" ||
        event.target.tagName === "SPAN" ||
        event.target.tagName === "H1" ||
        event.target.tagName === "H2" ||
        event.target.tagName === "H3" ||
        event.target.tagName === "H4" ||
        event.target.tagName === "H5" ||
        event.target.tagName === "H6"
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="app-container">
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onExit={handleWelcomeExit} />}
      </AnimatePresence>
      {showMainContent && (
        <>
          <HelloSection />
          <TopStories />
        </>
      )}
      <CustomCursor cursorVariant={cursorVariant} />
    </div>
  );
}

export default App;
