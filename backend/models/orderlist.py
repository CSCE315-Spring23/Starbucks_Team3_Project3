import datetime
import private_tools.db_connection as db
import private_tools.menu_items as mi
import sqlite3
import json


class Orderlist:
    def __init__(self):
        self.current_orderlist = []
        self.orderlist_db = []
        self.num_of_items = 0
        self.transaction_id = self._getLatestTransactionID()
        self.time = self._getCurrentTime()
        self.discounts = []
        self.total = 0.0
        self.employee = "Devon"

    def setEmployee(self, name):
        self.employee = name

    def getTransactionID(self):
        return self.transaction_id
    
    def getTime(self):
        return self.time
    
    def getTotal(self):
        return self.total
    
    def getNumberOfItems(self):
        return self.num_of_items

    def _getLatestTransactionID(self):
        # TODO: get the latest transaction ID, return as an int
        conn = db.DBConnection()
        date_today = self._getCurrentTime() * 1000
        res = conn.query("SELECT MAX(transaction_id) FROM transactions")[0][0]
        if res >= date_today:
            res += 1
        else:
            res = date_today + 1
        return res
        

    def _getCurrentTime(self):
        # TODO: get the latest time, return as a string of datetime format same in database
        today = datetime.datetime.today()
        return int(today.strftime('%y%m%d'))

    def returnJSON(self):
        orderlist = {"current_orderlist": self.current_orderlist,
                     "num_of_items": self.num_of_items,
                     "transaction_id": self.transaction_id,
                     "time": self.time,
                     "discounts": self.discounts,
                     "total": self.total
                    }
        return orderlist

    def addOrderlist(self, orderlist):
        for item in orderlist:
            self.addItem(item)

    def addItem(self, item):
        item_name = item["name"]
        addons = item["addons"]
        new_item = {"item_name" : item_name,
                    "addons": addons,
                    "price": self._getPriceFor(item_name) + sum([self._getPriceFor(addon) for addon in addons])}
        self.current_orderlist.append(new_item)
        self.orderlist_db.append(item_name)
        for addon in addons:
            self.orderlist_db.append(addon)
        self.num_of_items += 1
        self.total += new_item['price']

    def addDiscounts(self, discounts):
        for discount in discounts:
            self.discounts.append(discount)

    def _getPriceFor(self, item_name):
        '''
        TODO:
        0. get the price from item_name
        0.1. if self.discounts is empty, return price right now
        1. Get the discounts from the discount_table
        2. Concatenate all the discounts
        3. Get all the discounts that applies to that item_name
        4. Multiply all the discounts together
        5. Multiply by the original price
        6. return the discounted price.
        '''
        conn = db.DBConnection()
        price = float(conn.query(f"SELECT price FROM menu_items WHERE item_name='{item_name}'")[0][0])
        conn.close()
        return price

    def processOrderlist(self):
        '''
        TODO:
        1. Append orderlist into transactions
        '''
        ol = "{" + ", ".join(str(i) for i in self.orderlist_db) + "}"
        conn = db.DBConnection()
        conn.query(f"INSERT INTO transactions (transaction_id, transaction_date) VALUES ({self.transaction_id}, '{datetime.date.today()}')", False)
        # conn.query(f"UPDATE transactions SET transaction_date={self.time}", False)
        conn.query(f"UPDATE transactions SET order_size={self.num_of_items} WHERE transaction_id={self.transaction_id}", False)
        conn.query(f"UPDATE transactions SET order_list='{ol}' WHERE transaction_id={self.transaction_id}", False)
        conn.query(f"UPDATE transactions SET employee='{self.employee}' WHERE transaction_id={self.transaction_id}", False)
        conn.query(f"UPDATE transactions SET game_day=False WHERE transaction_id={self.transaction_id}", False)
        conn.query(f"UPDATE transactions SET order_total={self.total} WHERE transaction_id={self.transaction_id}", False)
        conn.close()


def queue_connection():
    conn = None
    try:
        conn = sqlite3.connect('orderlist.sqlite')
    except sqlite3.error as e:
        print(e)
    return conn

def getNewTransactionID():
    # TODO: get the latest transaction ID, return as an int
    conn = queue_connection()
    res = conn.execute("SELECT MAX(id) FROM orderlist").fetchone()[0]
    newID = res + 1 if res != None else 1
    # Create the new entry into the table:
    conn.execute(f"INSERT INTO orderlist (id, order_list, discount_list, employee) VALUES ({newID}, '', '', '')")
    conn.commit()
    conn.close()
    return {'transaction_id':newID}

def getJSON(id):
    conn = queue_connection()
    queue = conn.execute(f"SELECT * FROM orderlist WHERE id={id}").fetchall()[0]
    employee = queue[3]
    order = [] if queue[1] == "" else [json.loads(i) for i in queue[1].split(';')[:-1]]
    discounts = [] if queue[2] == "" else queue[2].split(';')
    returnJSON = {'employee': employee, 'orderlist': order, 'discounts':discounts}
    return returnJSON


def deleteOrderlist(id):
    conn = queue_connection()
    conn.execute(f"DELETE FROM orderlist WHERE id={id}")
    conn.commit()
    conn.close()
    return 202

def processOrderlist(id):
    conn = queue_connection()
    queue = conn.execute(f"SELECT * FROM orderlist WHERE id={id}").fetchall()[0]
    order = [] if queue[1] == "" else [json.loads(i) for i in queue[1].split(';')[:-1]]
    discounts = [] if queue[2] == "" else queue[2].split(';')
    orderlist = Orderlist()
    orderlist.addOrderlist(order)
    orderlist.addDiscounts(discounts)
    orderlist.setEmployee(queue[3])
    orderlist.processOrderlist()
    conn.close()

def updateEmployee(id, employee):
    conn = queue_connection()
    conn.execute(f"UPDATE orderlist SET employee='{employee}' WHERE id={id}")
    conn.commit()
    conn.close()

def addItem(id, orderlist):
    print(orderlist)
    conn = queue_connection()
    currlist = str(conn.execute(f"SELECT order_list FROM orderlist WHERE id={id}").fetchone()[0])
    newlist = currlist + json.dumps(orderlist) + ';'
    print(newlist)
    conn.execute(f"UPDATE orderlist SET order_list='{newlist}' WHERE id={id}")
    conn.commit()
    conn.close()


