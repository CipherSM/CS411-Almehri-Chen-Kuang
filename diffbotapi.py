import requests
import json
import datetime
from secret import DIFFBOT_API_TOKEN


def query_dql(subject, token=DIFFBOT_API_TOKEN):
    '''
        Parameters: Subject of query, optional token
        Return:
        API call for articles on subject
    '''
    today = datetime.date.today()

    # Generate dates from the start of the week to today
    week = [today - datetime.timedelta(days=i) for i in range(7)]

    querystring = {
        'token': token,
        'query': f'type:Article date<"{week[0]}" date>"{week[-1]}" title:"{subject}" language:"en" sortBy:date',
        'format': "json", 
        'size': 2       
    }
    response = requests.get('https://kg.diffbot.com/kg/v3/dql', params=querystring)
    data = response.json()
    articles = {}
    for i in range(len(data.get('data'))):
        article = data.get('data')[i].get('entity')
        articles[article.get('pageUrl')] = {'title' : article.get('title'), 'text' : article.get('text'), 'classification' : article.get('categories')}
    return articles
    
'''
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
'''
response = query_dql('bitcoin')
print(response)