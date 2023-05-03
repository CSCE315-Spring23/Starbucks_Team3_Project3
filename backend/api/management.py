from flask import request
from app import app
import datetime
import private_tools.db_connection as db
import models.management as man


@app.route("/management/sales", methods=["GET"])
def getAllSales():
    """
    Returns all sales in JSON format ready for table view
    :return: 200 if completed successfully
    """
    return man.getAllSales(), 200


@app.route("/management/x-report", methods=["POST"])
def getXReport():
    """
    Retrieves the X report given the date range
    :return: 200 on completion
    """
    dateJson = request.get_json()
    start = dateJson['start']
    end = dateJson['end']
    return man.categorizeSales(start, end), 200


@app.route("/management/z-report", methods=["GET"])
def getZReport():
    """
    Retrieves the Z report based on reported items
    :return: 200 on success or 204 if there is nothing to report
    """
    start,end = man.getZDateRange()
    # print(start, end)
    if start is None:
        return {}, 204
    man.markDaysAsReported()
    return man.categorizeSales(start, end), 200


@app.route("/management/menuitems", methods=["GET","POST","DELETE","PUT"])
def getAndUpdateMenu():
    """
    Accepts various types of calls depending on requested action:
    GET returns the current state of the menu in table form
    POST updates a menu item's features such as ingredients and price
    DELETE removes a menu item
    PUT adds a menu item
    :return: 200 on success 400 on failure
    """
    if request.method == "GET":
        return man.getMenuItems(), 200
    elif request.method == 'PUT':
        data = request.get_json()
        # print(data)
        try:
            newId = man.addMenuItem(data['name'], data['display'], data['category'], data['sized'], data['ingredients'], data['price'], True if data['sized'] and (isinstance(data['price'], int) or isinstance(data['price'], float)) else False)
            return str(newId), 200
        except ValueError as e:
            return e, 400
    elif request.method == 'DELETE':
        data = request.get_json()
        try:
            man.removeMenuItem(data['item_name'])
            return "", 204
        except Exception as e:
            return e, 400
    else:
        data = request.get_json()
        try:
            if 'price' in data:
                man.adjustPrice(data['name'], data['price'])
            if 'ingredients' in data:
                man.updateMenuIngredients(data['name'], data['ingredients'])
            return "", 204
        except Exception as e:
            return e, 406


@app.route("/management/inventory", methods=["GET","POST","DELETE","PUT"])
def getAndUpdateInventory():
    """
    Accepts various types of calls depending on requested action:
    GET returns the current state of the inventory in table form
    POST updates an ingredient's cost or low stock threshold
    DELETE removes an ingredient, requests the identifier and two booleans regarding safe deletion of items
    PUT adds a menu item based on data
    :return:
    """
    if request.method == "GET":
        return man.getInventory()[0][0], 200
    elif request.method == 'PUT':
        data = request.get_json()
        try:
            newId = man.addInventoryItem(data['name'], data['amount'], data['cost'], data['threshold'] if 'threshold' in data else 25)
            return newId, 201
        except ValueError as e:
            return e, 400
    elif request.method == 'DELETE':
        data = request.get_json()
        try:
            status, msg = man.removeIngredient(data['name'], True, True)
            if status:
                return msg, 200
            else:
                return msg, 400
        except Exception as e:
            return e, 400
    else:
        data = request.get_json()
        try:
            if 'price' in data:
                man.changeInventoryCost(data['name'], data['price'])
            if 'threshold' in data:
                man.changeLowStockThreshold(data['name'], data['threshold'])
            return "", 204
        except Exception as e:
            return e, 400


@app.route("/management/restock", methods=["POST"])
def restockInventory():
    """
    Attempts to restock the given inventory items listed, should be a series of items in the form
    index: name and amount
    :return: 204 on success and 400 on fail
    """
    try:
        data = request.get_json()
        if data['amount'] < 0:
            return f"{data['name']} cannot restock with a negative amount", 500
        man.restockItem(data['name'], data['amount'])
        return "", 204
    except Exception as e:
        return e, 400


@app.route("/management/voiditem", methods=["POST"])
def voidInventoryItem():
    """
    Attempts to void the given inventory item listed by the given amount
    {inventory_name, amount}
    :return: 204 on success and 400 on fail
    """
    try:
        data = request.get_json()
        man.voidItem(data['name'], data['amount'])
        return "", 204
    except Exception as e:
        return e, 400


@app.route("/management/transactions", methods=["POST", "GET"])
def viewTransactions():
    """
    Returns JSON table-ready form of the requested transactions. GET returns the latest 500 and
    POST returns all within a date range
    :return: table-ready JSON containing each transaction received
    """
    if request.method == 'GET':
        return man.viewTransactions(), 200
    else:
        dateJson = request.get_json()
        start = dateJson['start']
        end = dateJson['end']
        return man.viewTransactions(start, end), 200


@app.route("/management/employees", methods=["GET", "POST", "DELETE"])
def getAndUpdateEmployees():
    """
    Modifies the employee list or retrieves it according to the request method:
    GET retrieves all entries
    POST adds a new employee
    DELETE removes an employee
    :return: 200 on success, 400 on failure
    """
    if request.method == 'GET':
        return man.getEmployees(), 200
    elif request.method == 'POST':
        data = request.get_json()
        resp = man.addEmployee(data['name'], data['email'], data['management'])
        return resp[1], 200 if resp[0] else 400
    else:
        data = request.get_json()
        if 'id' in data:
            man.removeEmployee(data['id'])
        else:
            man.removeEmployee(data['email'])
        return f'Employee has been removed', 200


@app.route("/management/lowstock", methods=["GET", "POST"])
def lowStock():
    if request.method == 'GET':
        return man.getLowStock(), 200
    else:
        data = request.get_json()
        man.changeLowStockThreshold(data['inventory_name'], data['threshold'])
        return "Threshold has been changed", 200


@app.route("/management/getitem", methods=["POST"])
def getItem():
    """
    Gets the requested item from the database
    :return: The JSON of the item
    """
    data = request.get_json()
    # print(data)
    return man.getItem(data['name']), 200


@app.route("/management/getinvitem", methods=["POST"])
def getInvItem():
    """
    Gets the requested item from the database
    :return: The JSON of the item
    """
    data = request.get_json()
    # print(data)
    return man.getInvItem(data['name']), 200
