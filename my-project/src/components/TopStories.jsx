// src/components/Topstories.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function TopStories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5178/api/stories") // this is the port and route backend is at
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  return (
    <motion.div
      className="top-stories-container"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
    >
      {stories.map((story) => (
        <motion.div
          className="story-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          key={story.id}
        >
          <h3>{story.title}</h3>
          <p>{story.content}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TopStories;
