// generateArticles.js
import mongoose from "mongoose";
import { ArticleDB } from "../models/Topics.js";
import { queryDQL } from "./diffbotapi.js";

async function fetchAndSaveArticles(topic) {
  try {
    const articles = await queryDQL(topic);
    if (articles.length >= 3) {
      // Prepare data to replace all existing articles for this topic
      const articleData = {
        Topic: topic,
        URL1: articles[0].url,
        Title1: articles[0].title,
        Summary1: articles[0].summary,
        URL2: articles[1].url,
        Title2: articles[1].title,
        Summary2: articles[1].summary,
        URL3: articles[2].url,
        Title3: articles[2].title,
        Summary3: articles[2].summary,
      };

      // Delete existing and insert new articles atomically using bulk operations
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        await ArticleDB.deleteMany({ Topic: topic }, { session });
        await ArticleDB.insertMany([articleData], { session });
        await session.commitTransaction();
        console.log(`Articles for ${topic} replaced successfully.`);
      } catch (innerError) {
        await session.abortTransaction();
        console.error(`Error during transaction for ${topic}:`, innerError);
      } finally {
        session.endSession();
      }
    } else {
      console.log("Not enough articles found for topic:", topic);
    }
  } catch (error) {
    console.error(`Error fetching/saving articles for ${topic}:`, error);
  }
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function executeFetches() {
  const topics = [
    "Technology",
    "Business",
    "Environment",
    "Entertainment",
    "Sport",
  ];
  for (const topic of topics) {
    await fetchAndSaveArticles(topic);
    await delay(60000); // 60 seconds delay between fetches
  }
}

export { executeFetches };
