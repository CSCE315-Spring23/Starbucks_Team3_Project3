import private_tools.order_class as order

class Orderlist:
    def __init__(self, current_orderlist, size, transaction_id, time, discounts, total):
        self.current_orderlist = current_orderlist
        self.size = size
        self.transaction_id = transaction_id
        self.time = time
        self.discounts = discounts
        self.total = total
