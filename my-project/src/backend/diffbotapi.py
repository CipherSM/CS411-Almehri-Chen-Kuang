import requests
from secret import DIFFBOT_API_TOKEN
import json

def fetch_article(url, token=DIFFBOT_API_TOKEN):
    """
        Parameters: url of article, optional token
        Return:
        the url of the article
        title of the article
        categories of which the article falls for
        text of article
    """
    encoded_url = requests.utils.quote(url)

    request_url = f"https://api.diffbot.com/v3/article?url={encoded_url}&token={token}"

    headers = {"accept": "application/json"}

    response = requests.get(request_url, headers=headers)

    json_content = response.json()

    title = json_content['objects'][0]['title']

    if 'categories' not in json_content['objects'][0]:
        catergory = json_content['objects'][0]['categories']

        classification = [name for name in catergory]
    else:
        tags = json_content['objects'][0]['tags']
        tags = [(tag['count'], tag['name']) for tag in tags]
        # find top 3 tags
        classification = sorted(tags, key=lambda x: x[0], reverse=True)[:3]



    text = json_content['objects'][0]['text']
    return url, title, classification, text
