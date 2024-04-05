import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

function WelcomeScreen({ isVisible, onExit }) {
  const textAnimationControl = useAnimation();

  useEffect(() => {
    textAnimationControl.start({
      scale: 0.95, // Slightly reduce the scale
      opacity: 1,
      transition: { duration: 2 },
    });
  }, [textAnimationControl]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100vh" }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        zIndex: 10,
        background: `linear-gradient(0deg, transparent 24%, rgba(114, 114, 114, 0.3) 25%, rgba(114, 114, 114, 0.3) 26%, transparent 27%, transparent 74%, rgba(114, 114, 114, 0.3) 75%, rgba(114, 114, 114, 0.3) 76%, transparent 77%, transparent),
                      linear-gradient(90deg, transparent 24%, rgba(114, 114, 114, 0.3) 25%, rgba(114, 114, 114, 0.3) 26%, transparent 27%, transparent 74%, rgba(114, 114, 114, 0.3) 75%, rgba(114, 114, 114, 0.3) 76%, transparent 77%, transparent)`,
        backgroundColor: "#191a1a",
        backgroundSize: "55px 55px",
      }}
      onAnimationComplete={onExit}
    >
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={textAnimationControl}
        style={{
          textAlign: "left",
          maxWidth: "60%",
          fontSize: "4vw",
        }}
      >
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
          Hi user!
        </div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
          Welcome to your personalized dashboard!
        </div>
      </motion.div>
    </motion.div>
  );
}

export default WelcomeScreen;
