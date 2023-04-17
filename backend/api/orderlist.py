from flask import request
from app import app

import models.orderlist as ol

@app.route("/orderlist", methods=["GET", "POST"])
def createOrderlist():
    if request.method == "GET":
        return ol.getNewTransactionID(), 200
    elif request.method == "POST":
        jsonOL = request.get_json()
        orders = jsonOL['items']
        discounts = jsonOL['discounts']
        employee = jsonOL['employee']

        newOL = ol.Orderlist()
        newOL.addOrderlist(orders)
        newOL.addDiscounts(discounts)
        newOL.setEmployee(employee)
        newOL.processOrderlist()
        return newOL.returnJSON(), 200
    return "Serversize error", 500


@app.route("/orderlist/<int:id>", methods=["GET", "PUT", "DELETE"])
def editOrderlist(id):
    if request.method == "GET":
        return ol.getJSON(id)
    else:
        ol.deleteOrderlist(id)
        return "Successfully deleted", 202
    
@app.route("/orderlist/<int:id>/complete-order", methods=["GET"])
def completeOrder(id):
    ol.processOrderlist(id)
    return ol.getJSON(id)
    
@app.route("/orderlist/<int:id>/update-employee", methods=["PUT"])
def updateEmployee(id):
    employee = request.form["employee"]
    ol.updateEmployee(id, employee)
    return ol.getJSON(id)

@app.route("/orderlist/<int:id>/add-item", methods=["PUT"])
def addItem(id):
    orderlist = request.get_json()
    print(orderlist)
    ol.addItem(id, orderlist)
    return ol.getJSON(id)

@app.route("/orderlist/<int:id>/remove-item", methods=["PUT"])
def removeItem(id):
    orderlist = request.form["orderlist"]
    ol.removeItem(id, orderlist)

@app.route("/orderlist/<int:id>/add-discount", methods=["PUT"])
def addDiscount(id):
    discounts = request.form["discounts"]
    # ol.addDiscount(id, discounts)

@app.route("/orderlist/<int:id>/remove-discount", methods=["PUT"])
def removeDiscount(id):
    discounts = request.form["discounts"]
    # ol.removeDiscount(id, discounts)
