from flask import request, jsonify
from app import app

import private_tools.menu_items as mi


@app.route("/menu-items", methods=["GET"])
def getMenuItems():
    menuItemsTable = mi.getAllMenuItems()
    menuItems = [{"name": row[1], "category": row[3], "price": row[-1]} for row in menuItemsTable]
    return menuItems, 200