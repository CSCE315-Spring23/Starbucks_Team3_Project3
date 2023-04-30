import datetime
import private_tools.db_connection as db

def getAllSales():
    """
    Returns all sales entries in the database

    :return: All sales collected by the database
    :rtype: list[Tuple[dateTime, boolean, integer, float, boolean]]
    """
    conn = db.DBConnection()
    return conn.query('SELECT * FROM sales ORDER BY sales_date DESC')


def matchItemToCategoryAndPrice() -> dict:
    """
    Returns a dictionary matching every item to a category and price respectively in a tuple
    :return: A dictionary pairing to respective category and price for each item
    :rtype: dict[str, Tuple[str, float]]
    """
    conn = db.DBConnection()
    listings = {}
    matches = conn.query("SELECT item_name,category,price FROM menu_items")
    for match in matches:
        listings[match[0]] = (match[1], match[2])
    return listings


def categorizeSales(startDate, endDate):
    """
    Browses the transactions during the date range, and condenses the information organzied by category of each product
    Specifically meant for X and Z report, but could be used elsewhere

    :param startDate: A string representing the starting date to be categorized or preset datetime
    :type startDate: str or datetime
    :param endDate: A string representing the ending date to be categorized or preset datetime
    :type endDate: str or datetime
    :return: A dictionary matching each category to the money spent on items of the category between the two dates
    :rtype: dict[str, float]
    """
    categories = {'total': 0.0}
    conn = db.DBConnection()
    formattedStart = startDate
    formattedEnd = endDate
    if isinstance(startDate, str):
        formattedStart = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
        formattedEnd = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()
    elif not isinstance(startDate, datetime.datetime):
        raise TypeError from startDate
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
    """
    Helper function that marks days as reported so they won't be counted in the next Z report
    """
    conn = db.DBConnection()
    conn.query("UPDATE sales SET z_reported=true WHERE z_reported=false", False)


def getZDateRange() -> tuple[datetime.datetime]:
    """
    Returns the date range needed to perform the Z report
    :return: A tuple of start date and ending date
    :rtype: Tuple[datetime, datetime]
    """
    conn = db.DBConnection()
    dateRange = conn.query("SELECT MIN(sales_date),MAX(sales_date) FROM sales WHERE z_reported=false")[:][0]
    return dateRange


def viewTransactions(startDate=None, endDate=None):
    """
    Returns the list of transactions capping at either 500 or all entries if start and end dates are provided
    :param startDate: starting date
    :param endDate:  ending date
    :return: The results from the performed query based on the date range
    :rtype: List[Tuple]
    """
    conn = db.DBConnection()
    transactions = None
    if startDate == None and endDate == None:
        # Bypass our custom class to execute a custom command to only grab first 500
        conn.cur.execute("SELECT * FROM transactions ORDER BY transaction_id DESC")
        transactions = conn.cur.fetchmany(500)
    else:
        transactions = conn.query('SELECT * FROM transactions WHERE transaction_date >= %s AND transaction_date <= %s", params=(formattedStart, formattedEnd)')
    return transactions



