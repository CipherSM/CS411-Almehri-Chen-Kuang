// src/components/TopStories.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TopStories({ selectedTopic }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    if (selectedTopic) {
      console.log("Fetching stories for:", selectedTopic);
      fetch(`http://localhost:5178/api/stories/${selectedTopic}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data fetched:", data);
          setArticle(data);
        })
        .catch((error) => console.error("Error fetching stories:", error));
    }
  }, [selectedTopic]);

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="bg-white p-4 rounded-lg text-lg font-semibold mb-4 text-center">
        {selectedTopic}
      </h2>
      <div className="w-3/4 flex flex-wrap justify-between">
        {article && (
          <>
            <Card article={article} index={1} />
            {article.URL2 && <Card article={article} index={2} />}
            {article.URL3 && <Card article={article} index={3} />}
            {article.URL4 && <Card article={article} index={4} />}
          </>
        )}
      </div>
    </div>
  );
}

function Card({ article, index }) {
  const urlKey = `URL${index}`;
  const titleKey = `Title${index}`;
  const summaryKey = `Summary${index}`;

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md w-full md:max-w-sm mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
    >
      <a
        href={article[urlKey]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-600"
      >
        <h3 className="text-md font-bold">{article[titleKey]}</h3>
      </a>
      <div className="mt-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
          AI Summary:
        </span>
        <p className="text-sm mt-1">{article[summaryKey]}</p>
      </div>
    </motion.div>
  );
}

export default TopStories;
