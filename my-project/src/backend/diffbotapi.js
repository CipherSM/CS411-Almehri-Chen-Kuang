const axios = require('axios');
const { DIFFBOT_API_TOKEN } = require('./secret');

async function queryDQL(subject, token = DIFFBOT_API_TOKEN) {
    const today = new Date();
    const week = [];

    // Generate dates from the start of the week to today
    for (let i = 0; i < 7; i++) {
        let date = new Date();
        date.setDate(today.getDate() - i);
        week.push(date.toISOString().split('T')[0]); // Format as "YYYY-MM-DD"
    }

    const querystring = {
        token: token,
        query: `type:Article date<"${week[0]}" date>"${week[6]}" title:"${subject}" language:"en" sortBy:date`,
        format: "json",
        size: 2
    };

    try {
        const response = await axios.get('https://kg.diffbot.com/kg/v3/dql', { params: querystring });
        const data = response.data;
        const articles = {};
        if (data && data.data) {
            data.data.forEach(articleEntity => {
                const article = articleEntity.entity;
                if (article) {
                    articles[article.pageUrl] = {
                        title: article.title,
                        text: article.text,
                        classification: article.categories
                    };
                }
            });
        }
        return articles;
    } catch (error) {
        console.error('Error querying DQL:', error);
        return {};
    }
}

// Example usage:
queryDQL('bitcoin').then(response => {
    console.log(response);
});
