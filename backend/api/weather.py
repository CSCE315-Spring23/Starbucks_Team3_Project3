from app import app
import urllib.request
import configparser
import requests
from flask import Flask, render_template, request, abort, Response
import private_tools.weather_tools as weather

@app.route("/weather/<int:zip>", methods=["GET"])
def getWeather(zip):
    # apiKey = weather.apiKey()
    return weather.getWeather(zip)
    
    
# def apiKey():
#     configurator = configparser.ConfigParser()
#     configurator.read('config.ini')
#     return configurator['openweathermap']['api']

# def getWeather(zipCode, apiKey):
#     url = "https://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zipCode, apiKey)
#     result = requests.get(url)
#     return result.json()

# @app.route('/')
# def dashboard():
#     return render_template('index.html')

# @app.route('/results', methods=['POST'])
# def render_results():
#     zipCode = request.form['zipCode']
#     api_key = apiKey()
#     info = getWeather(zipCode, apiKey)
#     temp = "{0:.2f}".format(info["main"]["temp"])
#     weather = info["weather"][0]["main"]
#     location = info["name"]
#     return render_template('results.html', location=location, temp=temp, weather=weather)

# print(getWeather("77840", apiKey()))