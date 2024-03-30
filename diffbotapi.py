import requests
import json
import datetime
from secret import DIFFBOT_API_TOKEN


def query_dql(subject, token=DIFFBOT_API_TOKEN):
    today = datetime.date.today()
    start_of_week = today - datetime.timedelta(days=today.weekday())

    # Generate dates from the start of the week to today
    week = [start_of_week + datetime.timedelta(days=i) for i in range((today - start_of_week).days + 1)]
    
    querystring = {
        'token': token,
        'query': f'type:Article date<"{week[-1]}" date>"{week[0]}" title:"{subject}" language:"en" sortBy:date',
        'format': "json", 
        'size': 2       
    }
    return requests.get('https://kg.diffbot.com/kg/v3/dql', params=querystring)

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

response = query_dql('bitcoin')
response = response.json()

articles = {}
for i in range(len(response.get('data'))):
    article = response.get('data')[i].get('entity')
    if article.get('categories'):
        articles[article.get('pageUrl')] = {'title' : article.get('title'), 'summary': article.get('summary'), 'sentiment' : article.get('sentiment'), 'categories' : article.get('categories')}
    else:
        articles[article.get('pageUrl')] = {'title' : article.get('title'), 'summary': article.get('summary'), 'sentiment' : article.get('sentiment'), 'tags' : article.get('tags')}

print(response[0])
'''
for i, j in enumerate(articles):
    url, title, classification, text = fetch_article(j)
    print(text)
'''