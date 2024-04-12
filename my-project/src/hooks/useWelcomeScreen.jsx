// useWelcomeScreen.jsx
import { useState, useEffect } from "react";

const useWelcomeScreen = (timeout = 3000) => {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  return showWelcome;
};

export default useWelcomeScreen;
