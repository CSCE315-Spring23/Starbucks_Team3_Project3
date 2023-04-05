from flask import Flask, session, jsonify, request
from flask_cors import CORS #comment this on deployment
# from api.orderlist import *
# from api.management import *

app = Flask(__name__)
CORS(app) #comment this on deployment

app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = 'your-secret-key-here'

if 'order' not in session:
    session['order'] = []

@app.route("/")
def main():
    return "hit main"

@app.route("/serve")
def serve():
    return [{"name": "serve"},
           {"name": "paul"},
           {"name": "lucas"}]

import api.management as _
import api.orderlist as _
import api.menu_items as _

