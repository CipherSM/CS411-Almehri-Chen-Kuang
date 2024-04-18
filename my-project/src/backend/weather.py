import requests

def fetch_weather_data(lat, lon):
    base_url = "http://www.7timer.info/bin/api.pl"
    params = {
        'lon': lon,
        'lat': lat,
        'product': 'civillight', # or 'civil', 'astro', etc.
        'output': 'json'
    }
    response = requests.get(base_url, params=params)

    if response.status_code == 200:
        # Successfully got the weather
        data = response.json()
        # Process the data as per your needs
        return data
    else:
        # Handle errors
        return {'error': 'Failed to retrieve data'}

# Example usage
lat = 40.7128  # Latitude for New York City
lon = -74.0060  # Longitude for New York City
weather_data = fetch_weather_data(lat, lon)
print(weather_data)
