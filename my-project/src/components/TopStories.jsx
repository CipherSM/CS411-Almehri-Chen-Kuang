// TopStories.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../App.css";

function TopStories() {
  const [articles, setArticles] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");

  useEffect(() => {
    if (selectedTopic) {
      fetch(`http://localhost:5178/api/stories/${selectedTopic}`)
        .then((response) => response.json())
        .then((data) => {
          setArticles([data]); // Setting the articles with the fetched data
        })
        .catch((error) => console.error("Error fetching stories:", error));
    }
  }, [selectedTopic]);

  const topics = [
    "Technology",
    "Business",
    "Environment",
    "Entertainment",
    "Sport",
  ];

  return (
    <div>
      <div className="buttons-container">
        {topics.map((topic) => (
          <button key={topic} onClick={() => setSelectedTopic(topic)}>
            {topic}
          </button>
        ))}
      </div>
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

            <a href={article.URL2} target="_blank" rel="noopener noreferrer">
              <h3>{article.Title2}</h3>
            </a>
            <p>{article.Summary2}</p>

            <a href={article.URL3} target="_blank" rel="noopener noreferrer">
              <h3>{article.Title3}</h3>
            </a>
            <p>{article.Summary3}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default TopStories;
