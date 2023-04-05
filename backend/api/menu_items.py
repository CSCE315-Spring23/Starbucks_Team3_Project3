from flask import request, jsonify
from app import app

import private_tools.menu_items as mi


@app.route("/menu-items", methods=["GET"])
def getMenuItems():
    menuItemsTable = mi.getAllMenuItems()
    menuItems = [row[1] for row in menuItemsTable]
    menuItemsJSON = [{"item-name": name} for name in menuItems]
    return menuItemsJSON, 200