import axios from "axios";
import { summarizeText } from "./cohereaiapi.js"; // Importing the summarize function

const apiKey = process.env.DIFFBOTAPI_TOKEN;

async function queryDQL(subject, token = apiKey) {
  const today = new Date();
  const week = [];

  // Generate dates from the start of the week to today
  for (let i = 0; i < 7; i++) {
    let date = new Date();
    date.setDate(today.getDate() - i);
    week.push(date.toISOString().split("T")[0]); // Format as "YYYY-MM-DD"
  }

  const querystring = {
    token: token,
    query: `type:Article date<"${week[0]}" date>"${week[6]}" title:"${subject}" language:"en" sortBy:date`,
    format: "json",
    size: 1, // Assuming you want the most relevant article
  };

  try {
    const response = await axios.get("https://kg.diffbot.com/kg/v3/dql", {
      params: querystring,
    });
    const data = response.data;
    const articles = {};
    if (data && data.data) {
      for (const articleEntity of data.data) {
        const article = articleEntity.entity;
        if (article && article.text) {
          // Ensure the text is treated as a string and summarize it
          const text = String(article.text); // Converts non-string input to string
          const summary = await summarizeText(text);
          articles[article.pageUrl] = {
            title: article.title,
            text: summary, // Use the summary as the text field
            classification: article.categories,
          };
        }
      }
    }
    return articles;
  } catch (error) {
    console.error("Error querying DQL:", error);
    return {};
  }
}

// Example usage:
queryDQL("bitcoin").then((response) => {
  console.log(response);
});
