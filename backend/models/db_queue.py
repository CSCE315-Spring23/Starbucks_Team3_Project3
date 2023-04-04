import sqlite3


conn = sqlite3.connect("orderlist.sqlite")

cursor = conn.cursor()
create_table = ''' CREATE TABLE orderlist (
    id integer PRIMARY KEY,
    amt integer,
    order_list TEXT,
    employee TEXT,
    total REAL
)
'''

cursor.execute(create_table)