from secret import NEWS_API_TOKEN
# Init
# https://newsapi.org/docs/client-libraries/python
# https://newsapi.org/docs/guides/how-to-get-the-full-content-for-a-news-article
# https://newsapi.org/docs/get-started#top-headlines
import requests # pip install requests

# Replace 'YOUR_API_KEY' with your actual NewsAPI key
api_key = NEWS_API_TOKEN
url = f'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey={api_key}'

def fetch_news(url):
    response = requests.get(url)
    # Check if the request was successful
    if response.status_code == 200:
        return response.json()  # Return the JSON response if successful
    else:
        return f'Error fetching news: {response.status_code}'

# Call the function and print the result
news_data = fetch_news(url)
print(news_data)
