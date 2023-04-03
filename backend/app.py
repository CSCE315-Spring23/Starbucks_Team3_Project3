from flask import Flask
from flask_cors import CORS #comment this on deployment

app = Flask(__name__)
CORS(app) #comment this on deployment

import models.orderlist as _


import api.management as _
import api.orderlist as _

