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


def categorizeSales(startDate, endDate):
    categories = {'total': 0.0}
    conn = db.DBConnection()
    formattedStart = startDate
    formattedEnd = endDate
    if isinstance(startDate, str):
        formattedStart = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
        formattedEnd = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()

    orders = conn.query("SELECT order_list FROM transactions WHERE transaction_date >= %s AND transaction_date <= %s", params=(formattedStart, formattedEnd))
    matchedItems = matchItemToCategoryAndPrice()
    for order in orders:
        for item in order[0]:
            category, price = matchedItems[item]
            if category not in categories:
                categories[category] = price
            else:
                categories[category] += price
            categories['total'] += price
    for category in categories.keys():
        categories[category] = round(categories[category], 2)
    return categories


def markDaysAsReported():
    conn = db.DBConnection()
    conn.query("UPDATE sales SET z_reported=true WHERE z_reported=false", False)

def getZDateRange():
    conn = db.DBConnection()
    dateRange = conn.query("SELECT MIN(sales_date),MAX(sales_date) FROM sales WHERE z_reported=false")[:][0]
    return dateRange
