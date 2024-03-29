import requests
import datetime

def get_week_to_today(today_date):
    # Calculate the start of the week (Monday)
    start_of_week = today_date - datetime.timedelta(days=today_date.weekday())

    # Generate dates from the start of the week to today
    week_to_today = [start_of_week + datetime.timedelta(days=i) for i in range((today_date - start_of_week).days + 1)]

    return week_to_today

week = get_week_to_today(datetime.date.today())
print(str(week[0]))
#type:Article date:week[0] date:week[1]...[6]