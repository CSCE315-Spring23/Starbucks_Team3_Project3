from flask import request, jsonify
from app import app

import private_tools.menu_items as mi


@app.route("/menu-items", methods=["GET"])
def getMenuItems():
    menuItemsTable = mi.getAllMenuItems()
    menuItems = [{"name": row[1], "category": row[3]} for row in menuItemsTable]
    menuItemsJSON = [{"name": name} for name in menuItems[:10]]
    return menuItems[20:30], 200