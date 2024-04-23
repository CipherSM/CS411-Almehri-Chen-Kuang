// src/backend/generateArticles.j
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ArticleDB } from '../models/Topics.js';
import { queryDQL } from './diffbotapi.js';
dotenv.config({ path: "./src/keys.env" });
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchAndSaveArticles(topic, Model) {
    try {
        const articles = await queryDQL(topic);

        if (articles.length >= 3) {
            const articleData = {
                Topic: topic,
                URL1: articles[0].url,
                Title1: articles[0].title,
                Summary1: articles[0].summary,
                URL2: articles[2].url,
                Title2: articles[2].title,
                Summary2: articles[2].summary,
                URL3: articles[4].url,
                Title3: articles[4].title,
                Summary3: articles[4].summary,
            };

            const filter = { Title1: articles[0].title }; // Assuming Title1 is unique enough for identification
            const update = articleData;
            const options = { new: true, upsert: true }; // Create a new document if one doesn't exist

            const articleEntry = await Model.findOneAndUpdate(filter, update, options);
            console.log(`Articles for ${topic} updated or saved successfully.`);
        } else {
            console.log("Not enough articles found for topic:", topic);
        }
    } catch ( error ) {
        console.error(`Error fetching/saving articles for ${topic}:`, error);
    }
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function executeFetches() {
    await fetchAndSaveArticles("Technology", ArticleDB);
    await delay(60000); 
    await fetchAndSaveArticles("Business", ArticleDB);
    await delay(60000); 
    await fetchAndSaveArticles("Environment", ArticleDB);
    await delay(60000); 
    await fetchAndSaveArticles("Entertainment", ArticleDB);
    await delay(60000); 
    await fetchAndSaveArticles("Sport", ArticleDB);
    process.exit()
}
// start
executeFetches();
