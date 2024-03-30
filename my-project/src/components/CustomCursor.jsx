// CustomCursor.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = ({ cursorVariant }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16, // Center the cursor
      y: mousePosition.y - 16,
      scale: 1,
      opacity: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 2,
      backgroundColor: "pink",
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        backgroundColor: "black",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;
