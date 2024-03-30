import "./App.css";
import { AnimatePresence } from "framer-motion";
import useLenis from "./hooks/useLenis";
import useWelcomeScreen from "./hooks/useWelcomeScreen";
import useCursor from "./hooks/useCursor";
import CustomCursor from "./components/CustomCursor";
import WelcomeScreen from "./components/WelcomeScreen";
import HelloSection from "./components/HelloSection";
import TopStories from "./components/TopStories";

function App() {
  const showWelcome = useWelcomeScreen();
  const { cursorVariant, handleCursorEnter, handleCursorLeave } = useCursor();

  useLenis();

  return (
    <div className="app-container">
      <AnimatePresence>
        {showWelcome && <WelcomeScreen onExit={() => null} />}
      </AnimatePresence>
      <div
        className="dashboard"
        style={{ opacity: showWelcome ? 0 : 1 }}
        onMouseEnter={handleCursorEnter}
        onMouseLeave={handleCursorLeave}
      >
        <HelloSection />
        <TopStories />
      </div>
      <CustomCursor cursorVariant={cursorVariant} />
    </div>
  );
}

export default App;
