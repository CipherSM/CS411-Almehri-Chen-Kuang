// src/models/Topics.js
import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
  Topic: {
    type: String,
    required: true,
  },
  URL1: {
    type: String,
    required: true,
  },
  Title1: {
    type: String,
    required: true,
  },
  Summary1: {
    type: String,
    required: true,
  },
  URL2: {
    type: String,
  },
  Title2: {
    type: String,
  },
  Summary2: {
    type: String,
    required: true,
  },
  URL3: {
    type: String,
    required: true,
  },
  Title3: {
    type: String,
    required: true,
  },
  Summary3: {
    type: String,
  },
  URL4: {
    type: String,
    required: true,
  },
  Title4: {
    type: String,
    required: true,
  },
  Summary4: {
    type: String,
  },
});

const ArticleDB = mongoose.model("Articles", TopicSchema);

export { ArticleDB };
