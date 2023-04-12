from flask import request
from app import app

@app.route("/management/sales", methods=["GET"])
def getAllSales():
    pass
