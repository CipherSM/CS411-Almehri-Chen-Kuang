import cohere
from secret.py import API_KEY
co = cohere.Client('API_KEY')
news_content = """ """ # need to add news content here
text = news_content
response = co.summarize(
    text=text,
    model='command',
    length='medium',
    extractiveness='medium'
)

summary = response.summary
print(summary)
