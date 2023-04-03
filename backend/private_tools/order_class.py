class Order:
    def __init__(self, item_name, addons, price):
        self.item_name = item_name
        self.addons = addons
        self.price = price

    def __str__(self):
        return f"item_name: {self.item_name} addons: {self.addons} price: {self.price}"

    item_name = "null"
    addons = []
    price = -1