from app import app
import urllib.request
import configparser
import requests
from flask import Flask, render_template, request, abort, Response
def apiKey():
    configurator = configparser.ConfigParser()
    configurator.read('config.ini')
    return configurator['openweathermap']['api']

def getWeather(zipCode, apiKey):
    url = "https://api.openweathermap.org/data/2.5/weather?zip={}&units=imperial&appid={}".format(zipCode, apiKey)
    result = requests.get(url)
    return result.json()

print(getWeather("77840", apiKey()))