import datetime
import private_tools.db_connection as db
import private_tools.menu_items as mi


class Orderlist:
    def __init__(self):
        self.current_orderlist = []
        self.orderlist_db = []
        self.num_of_items = 0
        self.transaction_id = self._getLatestTransactionID()
        self.time = self._getCurrentTime()
        self.discounts = []
        self.total = 0

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
        self.orderlist_db.append(mi.getItemID(item_name))
        for addon in addons:
            self.orderlist_db.append(mi.getItemID(addon))
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
        conn.query(f"INSERT INTO transactions (transaction_id) VALUES ({self.transaction_id})", False)
        conn.query(f"UPDATE transactions SET transaction_date={self.time}", False)
        conn.query(f"UPDATE transactions SET num_of_items={self.num_of_items}", False)
        conn.query(f"UPDATE transactions SET order_list='{ol}'", False)
        conn.query(f"UPDATE transactions SET employee='Devon'", False)
        conn.query(f"UPDATE transactions SET total={self.total}", False)
        conn.close()

