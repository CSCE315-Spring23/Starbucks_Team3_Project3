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


@app.route('/api/order/add', methods=['POST'])
def add_item():
    item = request.json
    session['order'].append(item)
    return jsonify({'message': 'Item added to order'})


@app.route('/api/order/remove', methods=['POST'])
def remove_item():
    item = request.json
    session['order'].remove(item)
    return jsonify({'message': 'Item removed from order'})

@app.route('/api/order/get', methods=['GET'])
def get_order_list():
    return jsonify(session['order'])



