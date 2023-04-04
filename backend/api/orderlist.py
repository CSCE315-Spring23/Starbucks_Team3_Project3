from flask import request
from app import app

import models.orderlist as ol


@app.post("/orderlist")
def postOrderlist():
    data = request.get_json()
    orderlist = ol.Orderlist()
    orderlist.addOrderlist(data.get("orderlist"))
    orderlist.addDiscounts(data.get("discounts"))
    orderlist.processOrderlist()
    

