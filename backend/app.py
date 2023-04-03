from flask import Flask
from flask_cors import CORS #comment this on deployment

app = Flask(__name__)
CORS(app) #comment this on deployment

@app.route("/")
def main():
    return "hit main"

@app.route("/serve")
def serve():
    return [{"name": "serve"}, 
           {"name": "paul"},
           {"name": "lucas"}]

