from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS #comment this on deployment
import csv

app = Flask(__name__)
CORS(app) #comment this on deployment

# Create connection string
db = {}
with open("./private_tools/db_access.csv", 'r') as datfile:
    reader = list(csv.reader(datfile))
    for i in reader:
        db[i[0]] = i[1]
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://{}:{}@{}:{}/{}".format(
    db["user"], db["password"], db["host"], db["port"], db["dbname"]
)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Start database connection and generate tables
db = SQLAlchemy(app)
import models.transaction as _
with app.app_context():
    db.create_all()

@app.route("/")
def main():
    return "Howdy! You've reached the backend Flask server!"

