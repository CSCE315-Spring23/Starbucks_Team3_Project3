import backend.private_tools.db_connection as db

class Orderlist:
    def __init__(self):
        self.current_orderlist = []
        self.num_of_items = 0
        self.transaction_id = self._getLatestTransactionID()
        self.time = self._getLatestTime()
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

    def _getLatestTransactionID():
        # TODO: get the latest transaction ID, return as an int
        pass

    def _getLatestTime():
        # TODO: get the latest time, return as a string of datetime format same in database
        pass

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

    def addDiscounts(self, discounts):
        for discount in discounts:
            self.discounts.append(discount)

    def _getPriceFor(item_name):
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
        pass

    def processOrderlist():
        '''
        TODO:
        1. Append orderlist into transactions
        '''
