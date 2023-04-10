from app import db
from sqlalchemy.types import ARRAY

class Transaction(db.Model):
    __tablename__ = "transactions"

    transaction_id = db.Column(db.Integer, primary_key=True)
    transaction_date = db.Column(db.Date)
    order_size = db.Column(db.Integer)
    order_list = db.Column(ARRAY(db.String))
    employee = db.Column(db.String)
    game_day = db.Column(db.Boolean)
    order_total = db.Column(db.Float)
