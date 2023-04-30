from flask import request
from app import app
import datetime
import private_tools.db_connection as db
import models.management as man

@app.route("/management/sales", methods=["GET"])
def getAllSales():
    pass

@app.route("/management/x-report", methods=["POST"])
def getXReport():
    dateJson = request.get_json()
    start = dateJson['start']
    end = dateJson['end']
    return man.categorizeSales(start, end), 200

@app.route("/management/z-report", methods=["GET"])
def getZReport():
    start,end = man.getZDateRange()
    # print(start, end)
    if start is None:
        return {}, 204
    man.markDaysAsReported()
    return man.categorizeSales(start, end), 200

@app.route("/management/menuitems", methods=["GET","POST","DELETE","PUT"])
def getAndUpdateMenu():
    if request.method == "GET":
        return man.getMenuItems(), 200
    elif request.method == 'PUT':
        data = request.get_json()
        try:
            newId = man.addMenuItem(data['name'], data['display'], data['category'], data['sized'], data['ingredients'], data['price'], True if data['sized'] and isinstance(data['price'], int) else False)
            return newId, 201
        except ValueError as e:
            return e, 406
    elif request.method == 'DELETE':
        data = request.get_json()
        try:
            man.removeMenuItem(data['item_name'])
            return "", 204
        except Exception as e:
            return e, 406
    else:
        data = request.get_json()
        try:
            if 'price' in data:
                man.adjustPrice(data['item_name'], data['price'])
            if 'ingredients' in data:
                man.updateMenuIngredients(data['item_name'], data['ingredients'], data['sized'])
            return "", 204
        except Exception as e:
            return e, 406


