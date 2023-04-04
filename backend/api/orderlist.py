from flask import request, jsonify
from app import app

import models.orderlist as ol

@app.route("/orderlist", methods=["GET"])
def createOrderlist():
    return ol.getNewTransactionID()

@app.route("/orderlist/<int:id>", methods=["GET", "PUT", "DELETE"])
def editOrderlist(id):
    if request.method == "GET":
        return ol.getJSON(id)
    elif request.method == "PUT":
        ol.processOrderlist(id)
    else:
        ol.deleteOrderlist(id)

@app.route("/orderlist/<int:id>/add-item", methods=["PUT"])
def editItem(id):
    orderlist = request.form["orderlist"]
    ol.addItem(id, orderlist)

@app.route("/orderlist/<int:id>/remove-item", methods=["PUT"])
def editItem(id):
    orderlist = request.form["orderlist"]
    ol.removeItem(id, orderlist)

@app.route("/orderlist/<int:id>/add-discount", methods=["PUT"])
def editItem(id):
    discounts = request.form["discounts"]
    ol.addDiscount(id, discounts)

@app.route("/orderlist/<int:id>/remove-discount", methods=["PUT"])
def editItem(id):
    discounts = request.form["discounts"]
    ol.removeDiscount(id, discounts)
