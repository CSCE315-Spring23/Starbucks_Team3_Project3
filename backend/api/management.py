from flask import request
from app import app
import datetime
import private_tools.db_connection as db
import models.management as man

@app.route("/management/sales", methods=["GET"])
def getAllSales():
    pass

@app.route("/management/xreport", method=["POST"])
def getXReport():
    dateJson = request.get_json()
    start = dateJson['start']
    end = dateJson['end']
    categorySales = man.categorizeSales(start, end)

    pass

@app.route("/management/zreport", method=["GET"])
def getZReport():
    pass