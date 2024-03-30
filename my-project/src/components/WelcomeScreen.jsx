// In WelcomeScreen.jsx
import { motion } from "framer-motion";

function WelcomeScreen({ isVisible, onExit }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "4vw",
        color: "#fff",
        backgroundColor: "#000",
        zIndex: 10,
      }}
      onAnimationComplete={() => onExit()}
    >
      Hi user! Welcome to your personalized dashboard!
    </motion.div>
  );
}

export default WelcomeScreen;
