from app import app
import urllib.request
import configparser
import requests
from flask import Flask, render_template, request, abort, Response
import private_tools.weather_tools as weather



@app.route("/weather/<int:zip>", methods=["GET"])
def getWeather(zip):
    """
    Retrieves the weather information from Weather API based on zipcode
    :param x: The zip code of place we wish to get the information for.
    :type x: int
    :return: Weather information
    :rtype: list
    """
    # apiKey = weather.apiKey()
    return weather.getWeather(zip)
    
