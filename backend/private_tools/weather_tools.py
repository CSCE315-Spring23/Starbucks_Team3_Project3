import urllib.request
import configparser
import requests
import json
def apiKey():
    # configurator = configparser.ConfigParser()
    # configurator.read('config.ini')
    # return configurator['openweathermap']['api']
    with open('./private_tools/weather_api.json', 'r') as file:
        api = json.load(file)["api"]
        return api

def getWeather(zipCode):
    returnJSON = {}
    headers = {'Accept': 'application/json'}
    url = "https://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zipCode, apiKey())
    result = requests.get(url, headers=headers).json()
    returnJSON['main'] = result['weather'][0]['main']
    returnJSON['description'] = result['weather'][0]['description']
    returnJSON['temp'] = result['main']['temp']
    returnJSON['name'] = result['name']
    return returnJSON


#Uncomment to test results for API, can change zipcodes
print(getWeather(77840))