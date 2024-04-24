// src/components/TimeSection.jsx
import { motion } from "framer-motion";
import React from "react";

function TimeSection() {
  // Get the current date and time formatted
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use AM/PM format
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      style={{
        padding: "20px",
        marginTop: "50px", // Add margin to the top
        marginLeft: "150px", // Add margin to the left
        color: "#fff",
        backgroundColor: "rgba(51, 51, 51, 0.5)", // Semi-transparent
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        height: "auto", // Component height as tall as its content
        display: "inline-block", // Only take up as much width as the content requires
        textAlign: "left", // Align text to the left
      }}
    >
      <h1>{currentTime}</h1>
      <p>{currentDate}.</p>
    </motion.div>
  );
}

export default TimeSection;
