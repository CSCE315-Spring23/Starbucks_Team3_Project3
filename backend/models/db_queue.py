import sqlite3


conn = sqlite3.connect("orderlist.sqlite")

cursor = conn.cursor()
create_table = ''' CREATE TABLE orderlist (
    id integer PRIMARY KEY,
    order_list TEXT,
    discount_list TEXT,
    employee TEXT
)
'''

cursor.execute(create_table)