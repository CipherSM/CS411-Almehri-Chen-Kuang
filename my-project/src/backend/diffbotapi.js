// src/backend/diffbotapi.js
import axios from "axios";
import { summarizeText } from "./cohereaiapi.js";
import dotenv from "dotenv";
dotenv.config({ path: "./src/keys.env" });
const apiKey = process.env.DIFFBOTAPI_TOKEN;

async function queryDQL(subject, token = apiKey) {
  const today = new Date();
  const TodayDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const querystring = {
    token: token,
    query: `type:Article date:"${TodayDate}" title:"${subject}" language:"en" sortBy:date`,
    format: "json",
    size: 4, // Retrieve 5 articles
  };

  try {
    const response = await axios.get("https://kg.diffbot.com/kg/v3/dql", {
      params: querystring,
    });
    const data = response.data;
    const articles = [];
    if (data && data.data) {
      for (const articleEntity of data.data) {
        const article = articleEntity.entity;
        if (article && article.text) {
          // Ensure the text is treated as a string and summarize it
          const text = String(article.text); // Converts non-string input to string
          const summary = await summarizeText(text);
          articles.push({
            url: article.pageUrl,
            title: article.title,
            summary: summary,
          });
        }
      }
    }
    return articles;
  } catch (error) {
    console.error("Error querying DQL:", error);
    return [];
  }
}

export { queryDQL };
