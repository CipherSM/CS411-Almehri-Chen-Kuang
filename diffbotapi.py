import requests
import datetime
from secret import DIFFBOT_API_TOKEN

def query_dql(subject):
    today = datetime.date.today()
    start_of_week = today - datetime.timedelta(days=today.weekday())

    # Generate dates from the start of the week to today
    week = [start_of_week + datetime.timedelta(days=i) for i in range((today - start_of_week).days + 1)]
    
    querystring = {
        'token': DIFFBOT_API_TOKEN,
        'query': f'type:Article date<"{week[-1]}" date>"{week[0]}" title:"{subject}" language:"en"',
        'format': "json", 
        'size': 1        
    }
    return requests.get('https://kg.diffbot.com/kg/v3/dql', params=querystring)

response = query_dql('bitcoin')
print(response.headers)