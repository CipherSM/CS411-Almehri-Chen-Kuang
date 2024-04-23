// src/routes/articles.js

import { Router } from "express";
import { ArticleDB } from "../models/Topics.js";

const router = Router();

router.get("/:topic", async (req, res) => {
  const topic = req.params.topic;
  try {
    const articles = await ArticleDB.findOne({ Topic: topic });
    if (articles) {
      res.json(articles);
    } else {
      res
        .status(404)
        .json({ message: `No articles found for topic: ${topic}` });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching articles by topic", error: error });
  }
});

export default router;
