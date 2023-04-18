import datetime
import private_tools.db_connection as db

def getAllSales():
    pass


def matchItemToCategoryAndPrice() -> dict:
    conn = db.DBConnection()
    listings = {}
    matches = conn.query("SELECT item_name,category,price FROM menu_items")
    for match in matches:
        listings[match[0]] = (match[1], match[2])
    return listings


def categorizeSales(startDate: str, endDate: str) -> dict:
    categories = {'total': 0.0}
    conn = db.DBConnection()
    formattedStart = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
    formattedEnd = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()
    orders = conn.query("SELECT order_list FROM transactions WHERE transaction_date >= %s AND transaction_date <= %s", (formattedStart, formattedEnd))
    matchedItems = matchItemToCategoryAndPrice()
    for order in orders:
        for item in order[0]:
            category, price = matchedItems[item]
            if category not in categories:
                categories[category] = price
            else:
                categories[category] += price
            categories['total'] += price

    return categories


def markDaysAsReported():
    pass
