import datetime

import psycopg2.errors

import private_tools.db_connection as db
from psycopg2.extras import execute_values
import re

def getAllSales():
    """
    Returns all sales entries in the database

    :return: All sales collected by the database
    :rtype: list[Tuple[dateTime, boolean, integer, float, boolean]]
    """
    conn = db.DBConnection()
    res = conn.query('SELECT * FROM sales ORDER BY sales_date DESC')
    json = {}
    for i in range(len(res)):
        json[i] = {
            'date': res[i][0],
            'game_day': res[i][1],
            'total_orders': res[i][2],
            'total_sales': res[i][3]
        }
    return json


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
    :type startDate: str or datetime.datetime
    :param endDate: A string representing the ending date to be categorized or preset datetime
    :type endDate: str or datetime.datetime
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
        raise TypeError("Invalid type of date range, must be either datetime or str in format yyyy-mm-dd")
    orders = conn.query("SELECT order_list FROM transactions WHERE transaction_date >= %s AND transaction_date <= %s",
                        params=(formattedStart, formattedEnd))
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


def getZDateRange() -> tuple[datetime.datetime, datetime.datetime]:
    """
    Returns the date range needed to perform the Z report
    :return: A tuple of start date and ending date
    :rtype: Tuple[datetime, datetime]
    """
    conn = db.DBConnection()
    dateRange = conn.query("SELECT MIN(sales_date),MAX(sales_date) FROM sales WHERE z_reported=false")[0][:]
    return dateRange


def viewTransactions(startDate=None, endDate=None):
    """
    Returns the list of transactions capping at either 500 or all entries if start and end dates are provided
    :param startDate: starting date
    :type startDate: datetime.datetime or str
    :param endDate:  ending date
    :type endDate: datetime.datetime or str
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
        formattedStart = startDate
        formattedEnd = endDate
        if isinstance(startDate, str):
            formattedStart = datetime.datetime.strptime(startDate, '%Y-%m-%d').date()
            formattedEnd = datetime.datetime.strptime(endDate, '%Y-%m-%d').date()
        transactions = conn.query(
            'SELECT * FROM transactions WHERE transaction_date >= %s AND transaction_date <= %s ORDER BY transaction_id ',
            params=(formattedStart, formattedEnd))
    json = {}
    for i in range(len(transactions)):
        json[i] = {
            'id': transactions[i][0],
            'date': transactions[i][1],
            'count': transactions[i][2],
            'items': transactions[i][3],
            'employee': transactions[i][4],
            'game_day': transactions[i][5],
            'total': transactions[i][6]
        }
    return json


def adjustPrice(identifier, price: float):
    """
    Adjusts the price of a given item

    :param identifier: Flexible identifier token can either be the item id or name
    :type identifier: str or int
    :param price: The updated price
    :type price: float
    """
    if price < 0:
        raise ValueError("cannot have a negative price")
    conn = db.DBConnection()
    if isinstance(identifier, str):
        conn.query(f'UPDATE menu_items SET price = {price} WHERE item_name=\'{identifier}\'', False)
    elif isinstance(identifier, int):
        conn.query(f'UPDATE menu_items SET price = {price} WHERE item_id={identifier}', False)
    else:
        raise TypeError("identifier is neither string or int")


def getMenuItems():
    """
    Creates a JSON friendly dictionary from the database's menu
    :return: Dictionary modeling JSON return
    """
    # listings = {}
    conn = db.DBConnection()
    # table = conn.query("SELECT * FROM menu_items")
    # for i in range(len(table)):
    #     listings[i] = {
    #         'item_id': table[i][0],
    #         'item_name': table[i][1],
    #         'display_name': table[i][2],
    #         'category': table[i][3],
    #         'size': table[i][4],
    #         'ingredients': getIngredients(table[i][0]),
    #         'price': table[i][7]
    #     }
    # listings = [{
    #     'item_id': item[0],
    #     'item_name': item[1],
    #     'display_name': item[2],
    #     'category': item[3],
    #     'size': item[4],
    #     'ingredients': getIngredients(item[0]),
    #     'price': item[7]
    # } for item in table]
    # New method was still too slow returning unoptimized table instead
    # 73 seconds vs 400 ms for returned table
    table = conn.query("""
    SELECT json_build_object(
        'item_id', item_id,
        'item_name', item_name,
        'display_name', display_name,
        'category', category,
        'size', size,
        'ingredients', json_agg(json_build_object(
            'inventory_name', ingredient,
            'amount', amount
        )),
        'price', price
    ) AS listing
    FROM (
        SELECT mi.item_id, mi.item_name, mi.display_name, mi.category, mi.size,
               i.ingredient, i.amount, mi.price
        FROM menu_items mi
        JOIN (
            SELECT item_id, unnest(ingredients) AS ingredient, unnest(amounts) AS amount
            FROM menu_items
    ) i ON mi.item_id = i.item_id
    ) items
    GROUP BY item_id, item_name, display_name, category, size, price
    """)

    table = [x[0] for x in table]
    return table


def getInventory():
    """
    Returns JSON formatted list of inventory items
    :return: JSON formatted list of inventory items
    :rtype: list[dict, ...]
    """
    conn = db.DBConnection()
    # table = conn.query("SELECT * FROM inventory ORDER BY inventory_name")
    # listings = {}
    # for i in range(len(table)):
    #     listings[i] = {
    #         'inventory_id': table[i][0],
    #         'inventory_name': table[i][1],
    #         'quantity': table[i][2],
    #         'cost': table[i][3],
    #         'threshold': table[i][4],
    #         'restockedOn': table[i][5]
    #     }

    results = conn.query("""
            SELECT json_agg(json_build_object(
                'inventory_id', inventory_id,
                'inventory_name', inventory_name,
                'quantity', quantity,
                'cost', costs,
                'threshold', minimum_quantity,
                'restockedOn', last_restocked
            )) AS listings
            FROM inventory
        """)

    return results


def addMenuItem(name: str, display: str, category: str, sized: bool, ingredients: list[tuple[str, float]],
                price, autocalc=False):
    """
    Adds a menu item including the sized variants if applicable with the given ingredients and price
    :param name: internal name of the item not including the size aka coffee-tall -> coffee, size will be added in function
    :param display: external name of the item
    :param category: category of the drink. includes: espresso-drinks, tea-hot-iced, bakery-coremark, coffee_hot_iced, add-on, frappuccino-and-blended
    :param sized: boolean representing if the drink has tall/grande/venti variants or not
    :param ingredients: list containing pairs of ingredients and their respective portions
    :param price: price of the item or tuple for the three different prices
    :param autocalc: flag that determines if pricing is auto-calculated for sized drink at ratio of .85 and 1.25 for tall and venti respectively
    """
    conn = db.DBConnection()
    itemId = conn.query("SELECT MAX(item_id) FROM menu_items")[0][0] + 1
    if len(conn.query(f"SELECT item_name FROM menu_items WHERE item_name LIKE {name + '%'}")) < 1:
        raise ValueError(f'{name} is already in the database')
    if price < 0:
        raise ValueError("Price cannot be less than 0")
    for ingredient in ingredients:
        if ingredient[1] < 0:
            raise ValueError(f"{ingredient[0]} has amount less than 0")
    # if category not in currentCategories:
    #     raise ValueError("Category not currently supported")
    if sized:
        if autocalc:
            price = (price * .85, price, price * 1.25)
        conn.query(
            "INSERT INTO menu_items (item_id, item_name, display_name, category, size, ingredients, amounts, price)"
            "VALUES (%s, %s, %s, %s, 'tall', %s, %s, %s)",
            False, (itemId, name + "-tall", display, category, ingredients[:][0], ingredients[:][1], price[0]))
        itemId += 1
        conn.query(
            "INSERT INTO menu_items (item_id, item_name, display_name, category, size, ingredients, amounts, price)"
            "VALUES (%s, %s, %s, %s, 'grande', %s, %s, %s)",
            False, (itemId, name + "-grande", display, category, ingredients[:][0], ingredients[:][1], price[1]))
        itemId += 1
        conn.query(
            "INSERT INTO menu_items (item_id, item_name, display_name, category, size, ingredients, amounts, price)"
            "VALUES (%s, %s, %s, %s, 'venti', %s, %s, %s)",
            False, (itemId, name + "-venti", display, category, ingredients[:][0], ingredients[:][1], price[2]))
        return itemId-2  # Item id of tall
    else:
        conn.query(
            "INSERT INTO menu_items (item_id, item_name, display_name, category, size, ingredients, amounts, price)"
            "VALUES (%s, %s, %s, %s, 'NA', %s, %s, %s)",
            False, (itemId, name, display, category, ingredients[:][0], ingredients[:][1], price))
        return itemId

def removeMenuItem(identifier):
    """
    Remove a menu item from the menu
    :param identifier: a str for the item name or int for the item id
    :type identifier: int or str
    """
    conn = db.DBConnection()
    size = None
    if isinstance(identifier, str):
        size, identifier = conn.query("SELECT size,item_id FROM menu_items WHERE item_name=%s", params=(identifier,))

    elif isinstance(identifier, int):
        size = conn.query("SELECT size FROM menu_items WHERE item_id=%s", params=(identifier,))

    else:
        raise TypeError("identifier is not a string or int")

    if size == 'NA':
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier,))
    elif size == 'tall':
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier + 1,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier + 2,))
    elif size == 'grande':
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier - 1,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier + 1,))
    else:
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier - 2,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier - 1,))
        conn.query("DELETE FROM menu_items WHERE item_id=%s", False, (identifier,))


def updateMenuIngredients(id, newIngredients, sized):
    """
    Updates the ingredients of the item with the given id to the updated list
    :param id: id of the menu item
    :param newIngredients: new ingredient list or lists if sized (3)
    :param sized: bool of if the item is sized
    """
    conn = db.DBConnection()
    if not sized:
        conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                   (newIngredients[:][0], newIngredients[:][1], id))
    else:
        size = conn.query("SELECT size FROM menu_items WHERE item_id=%s", True, (id,))[0][0]
        if size == 'tall':
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[0][:][0], newIngredients[0][:][1], id))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[1][:][0], newIngredients[1][:][1], id + 1))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[2][:][0], newIngredients[2][:][1], id + 2))
        elif size == 'grande':
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[0][:][0], newIngredients[0][:][1], id - 1))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[1][:][0], newIngredients[1][:][1], id))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[2][:][0], newIngredients[2][:][1], id + 1))
        else:
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[0][:][0], newIngredients[0][:][1], id - 2))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[1][:][0], newIngredients[1][:][1], id - 1))
            conn.query("UPDATE menu_items SET ingredients = %s, amounts = %s WHERE item_id = %s", False,
                       (newIngredients[2][:][0], newIngredients[2][:][1], id))


def getIngredients(identifier):
    """
    Returns the ingredients and amounts from the item in the parameters
    :param identifier: a string or int representing the item_name or item_id respectively
    :type identifier: int or str
    :return: returns the list of pairs of ingredients and their amounts
    """
    # conn = db.DBConnection()
    # paired = []
    # if isinstance(identifier, str):
    #     ingredients, amounts = conn.query(f"SELECT ingredients,amounts FROM menu_items WHERE item_name='{identifier}'")[0]
    #     for i, ingredient in enumerate(ingredients):
    #         paired.append({'inventory_name': ingredient, 'amount': amounts[i]})
    # elif isinstance(identifier, int):
    #     ingredients, amounts = conn.query(f"SELECT ingredients,amounts FROM menu_items WHERE item_id={identifier}")[0]
    #     for i, ingredient in enumerate(ingredients):
    #         paired.append({'inventory_name': ingredient, 'amount': amounts[i]})
    # else:
    #     raise TypeError("identifier is neither a string nor an int")
    # return paired
    conn = db.DBConnection()
    if isinstance(identifier, str):
        query = f"""
                SELECT i.inventory_name, i.amount
                FROM (
                    SELECT item_id, UNNEST(ingredients) AS inventory_name, UNNEST(amounts) AS amount
                    FROM menu_items
                    WHERE item_name = '{identifier}'
                ) i
            """
    elif isinstance(identifier, int):
        query = f"""
                SELECT i.inventory_name, i.amount
                FROM (
                    SELECT item_id, UNNEST(ingredients) AS inventory_name, UNNEST(amounts) AS amount
                    FROM menu_items
                    WHERE item_id = {identifier}
                ) i
            """
    else:
        raise TypeError("identifier is neither a string nor an int")
    results = conn.query(query)
    return [{'inventory_name': item[0], 'amount': item[1]} for item in results]


def restockItem(identifier, amount):
    """
    Restocks the item given by identifier with the given amount of the item in the database
    :param identifier: a string or int representing the item_name or item_id respectively
    :type identifier: int or str
    :param amount: amount of item to be restocked
    """
    if amount < 0:
        raise ValueError("cannot have a negative amount")
    conn = db.DBConnection()
    if isinstance(identifier, str):
        conn.query(f'UPDATE inventory SET last_restocked = %s, quantity=quantity+%s WHERE inventory_name=%s', False, (datetime.datetime.now().date(), amount, identifier))

    elif isinstance(identifier, int):
        conn.query('UPDATE inventory SET last_restocked = %s, quantity=quantity+%s WHERE inventory_id=%s', False, (datetime.datetime.now().date(), amount, identifier))
    else:
        raise TypeError("identifier is neither string or int")


def addInventoryItem(name: str, initialAmount: int, cost: float, lowStockThreshold: float = 25):
    """
    Add a new inventory item. Checks for existing items and proper amounts
    :param name: name of ingredient
    :param initialAmount: initial amount of the item
    :param cost: cost to supply the item
    :param lowStockThreshold: threshold to be considered low stock
    """
    if cost < 0:
        raise ValueError('cost cannot be less than 0')
    if lowStockThreshold < 0:
        raise ValueError('lowStockThreshold cannot be less than 0')
    if initialAmount < 0:
        raise ValueError('initialAmount cannot be less than 0')
    conn = db.DBConnection()
    if len(conn.query("SELECT inventory_id FROM inventory WHERE inventory_name=%s", True, (name,))) > 0:
        raise ValueError('Item already exists')
    nextId = conn.query("SELECT MAX(inventory_id) FROM inventory")[0][0] + 1
    conn.query('INSERT INTO inventory (inventory_id, inventory_name, quantity, costs, minimum_quantity, last_restocked) VALUES (%s, %s, %s, %s, %s, %s)', False, (nextId, name, initialAmount, cost, lowStockThreshold, datetime.date.today()))
    return nextId


def changeInventoryCost(identifier, cost: float):
    """
    Changes the inventory ingredient cost in the database
    :param identifier: a string or int representing the inventory_name or inventory_id respectively
    :type identifier: int or str
    :param cost: new cost of the ingredient
    :type cost: float
    """
    if cost < 0:
        raise ValueError('cost cannot be less than 0')
    conn = db.DBConnection()
    if isinstance(identifier, str):
        conn.query('UPDATE inventory SET costs= %s WHERE inventory_name= %s', False, (cost, identifier))
    elif isinstance(identifier, int):
        conn.query('UPDATE inventory SET costs= %s WHERE inventory_id= %s', False, (cost, identifier))
    else:
        raise TypeError("identifier is neither string or int")


def changeLowStockThreshold(identifier, threshold: float):
    """
    Changes the low stock threshold of the given item
    :param identifier: a string or int representing the inventory_name or inventory_id respectively
    :type identifier: int or str
    :param threshold: new threshold of low stock
    :type threshold: float or int
    """
    if threshold < 0:
        raise ValueError('cost cannot be less than 0')
    conn = db.DBConnection()
    if isinstance(identifier, str):
        conn.query('UPDATE inventory SET minimum_quantity= %s WHERE inventory_name= %s', False, (threshold, identifier))
    elif isinstance(identifier, int):
        conn.query('UPDATE inventory SET minimum_quantity= %s WHERE inventory_id= %s', False, (threshold, identifier))
    else:
        raise TypeError("identifier is neither string or int")


def getLowStock():
    """
    Finds all items that are considered low stock (stock < minimum quantity)
    :return: Table of all low stock items and all columns from the database
    """
    conn = db.DBConnection()
    table = conn.query('SELECT * FROM inventory WHERE quantity < minimum_quantity')
    listings = {}
    for i in range(len(table)):
        listings[i] = {
            'inventory_id': table[i][0],
            'inventory_name': table[i][1],
            'quantity': table[i][2],
            'cost': table[i][3],
            'threshold': table[i][4],
            'restockedOn': table[i][5]
        }
    return listings


def removeIngredient(identifier, deleteIfStockLeft: bool = False, deleteIfInMenu: bool = False):
    """
    Safely deletes an ingredient from the database. If deleteIfInMenu is enabled, menu items that rely on the ingredient will also be removed. Use with caution
    :param identifier: a string or int representing the inventory_name or inventory_id respectively
    :type identifier: int or str
    :param deleteIfStockLeft: flag that will allow deletion if stock is still in the system
    :type deleteIfStockLeft: bool
    :param deleteIfInMenu: flag that will allow deletion if menu items are still in the menu, will also delete those menu items
    :type deleteIfInMenu: bool
    :return: a bool indicating if the item was removed and a string message corresponding to the reason
    :rtype: tuple[bool, str]
    """
    conn = db.DBConnection()
    name = None
    if isinstance(identifier, str):
        name = identifier
        identifier = conn.query('SELECT inventory_id FROM inventory WHERE inventory_name= %s', True, (identifier,))[0][0]
    elif isinstance(identifier, int):
        name = conn.query('SELECT inventory_name FROM inventory WHERE inventory_id= %s', True, (identifier,))[0][0]
    else:
        raise TypeError("identifier is neither string or int")
    stockLeft = conn.query("SELECT quantity FROM inventory WHERE inventory_id = %s", True, (identifier,))[0][0]
    if (not deleteIfStockLeft) and stockLeft > 0:
        return False, "Item not removed: Stock is left"
    # Potentially move this into if statement if not needed to show manager
    itemsUsingIngredient = conn.query('SELECT item_name FROM menu_items WHERE %s = ANY(ingredients)')[0][:]
    if (not deleteIfInMenu) and len(itemsUsingIngredient) > 0:
        return False, "Item not removed: menu items use this ingredient"
    conn.query("DELETE FROM inventory WHERE inventory_id= %s", False, (identifier,))
    if stockLeft > 0 and len(itemsUsingIngredient) > 0:
        execute_values(conn.cur, "DELETE FROM menu_items WHERE item_name= %s", (itemsUsingIngredient,))
        return True, f"Item removed: Stock Left: {stockLeft}, Items Deleted: {itemsUsingIngredient}"
    elif stockLeft > 0:
        return True, f"Item removed: lost {stockLeft} items"
    elif len(itemsUsingIngredient) > 0:
        execute_values(conn.cur, "DELETE FROM menu_items WHERE item_name= %s", (itemsUsingIngredient,))
        return True, f"Item removed: Items Deleted: {itemsUsingIngredient}"


def voidItem(identifier, amount):
    """
    Void an amount of  the item given by identifier in the database
    :param identifier: a string or int representing the item_name or item_id respectively
    :type identifier: int or str
    :param amount: amount of item to be restocked
    :type amount: float
    """
    if amount < 0:
        raise ValueError("cannot have a negative amount")
    conn = db.DBConnection()
    if isinstance(identifier, str):
        if conn.query("SELECT quantity FROM inventory WHERE inventory_name=%s", True, (identifier,))[0][0] < amount:
            raise ValueError("amount to void is greater than available inventory in database")
        conn.query(f'UPDATE inventory SET last_restocked = %s, quantity=quantity+%s WHERE inventory_name=%s', False, (datetime.datetime.now().date(), amount, identifier))

    elif isinstance(identifier, int):
        if conn.query("SELECT quantity FROM inventory WHERE inventory_id=%s", True, identifier)[0][0] < amount:
            raise ValueError("amount to void is greater than available inventory in database")
        conn.query('UPDATE inventory SET last_restocked = %s, quantity=quantity+%s WHERE inventory_id=%s', False, (datetime.datetime.now().date(), amount, identifier))
    else:
        raise TypeError("identifier is neither string or int")


def getAmountOfInventroy(identifier):
    """
    Get the quantity of item in the database
    :param identifier: a string or int representing the item_name or item_id respectively
    :type identifier: int or str
    """
    conn = db.DBConnection()
    if isinstance(identifier, str):
        return conn.query(f'SELECT quantity FROM inventory WHERE inventory_name=%s', True, (identifier,))[0][0]

    elif isinstance(identifier, int):
        return conn.query(f'SELECT quantity FROM inventory WHERE inventory_id=%s', True, (identifier,))[0][0]
    else:
        raise TypeError("identifier is neither string or int")


def getEmployees():
    """
    Retrieves all the employees to be listed in the table
    :return: JSON formatted list of employees
    """
    conn = db.DBConnection()
    results = conn.query("""
                SELECT json_agg(json_build_object(
                    'employee_id', employee_id,
                    'employee_name', employee_name,
                    'employee_role', employee_role,
                    'management', access_mgmt,
                    'pin', employee_pin,
                    'email', email
                )) AS listings
                FROM employees
            """)

    return results[0][0]


def addEmployee(name, email, management=False):
    """
    Adds employee into the database
    :param name: Name of the employee
    :type name: str
    :param management: boolean representing if the employee is management
    :type management: bool
    :param email: email of the employee to be used with OAuth
    :type email: str
    :return: boolean representing if successfully added and message
    :rtype tuple[bool,str]
    """
    conn = db.DBConnection()
    # Below is regex for email checking
    # allows one or more alphanumeric plus . _ % + and - followed by @ then
    # one or more alphanumeric plus . and -, followed by . then 2 or more alphanumerics.
    # ^ and $ anchor the regex so that it must match the whole string
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(pattern, email):
        return False, 'Email not in proper form'
    # if email in [x[0] for x in conn.query("SELECT email FROM employees")]:
    #     return False, 'Email already in use'
    try:
        if management:
            nextId = conn.query("SELECT max(employee_id) FROM employees WHERE employee_id >= 2000")[0][0] + 1
            conn.query("INSERT INTO employees (employee_id, employee_name, employee_role, access_mgmt, email) VALUES "
                       "(%s, %s, 'manager', true, %s)", False, (nextId, name, email))
        else:
            nextId = conn.query("SELECT max(employee_id) FROM employees WHERE employee_id < 2000")[0][0] + 1
            conn.query("INSERT INTO employees (employee_id, employee_name, employee_role, access_mgmt, email) VALUES "
                       "(%s, %s, 'server', false, %s)", False, (nextId, name, email))
        return True, f'Employee added with id {nextId}'
    except psycopg2.errors.UniqueViolation as exc:
        return False, "Email already in use"


def removeEmployee(identifier):
    """
    Using the employee email or id, which is unique to each employee, removes the given employee
    :param identifier: Either the email or id to find the employee by
    :type identifier: int or str
    """
    conn = db.DBConnection()
    if isinstance(identifier, int):
        conn.query("DELETE FROM employees WHERE employee_id = %s", False, (identifier,))
    elif isinstance(identifier, str):
        conn.query("DELETE FROM employees WHERE email = %s", False, (identifier,))
    else:
        raise TypeError("identifier is not int or str")