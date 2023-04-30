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

@app.route("/management/menuitems", methods=["GET","POST"])
def getAndUpdateMenu():
    if request.method == "GET":
        pass
    else:
        pass