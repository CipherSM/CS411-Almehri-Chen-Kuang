// src/components/TopStories.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function TopStories({ selectedTopic }) { // Receive selectedTopic as prop
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (selectedTopic) {
      console.log("Fetching stories for:", selectedTopic);
      fetch(`http://localhost:5178/api/stories/${selectedTopic}`)
        .then(response => response.json())
        .then(data => {
          console.log("Data fetched:", data);
          setArticles([data]); // Assuming data is an array of articles
        })
        .catch(error => console.error("Error fetching stories:", error));
    }
  }, [selectedTopic]);

  return (
    <div>
      <motion.div
        className="top-stories-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
      >
        {articles.map((article, index) => (
          <motion.div
            className="story-card"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            key={index}
          >
            <h2>{selectedTopic}</h2>
            <a href={article.URL1} target="_blank" rel="noopener noreferrer">
              <h3>{article.Title1}</h3>
            </a>
            <p>{article.Summary1}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default TopStories;