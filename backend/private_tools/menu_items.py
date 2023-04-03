import db_connection as db

def getAllMenuItems():
    conn = db.DBConnection()
    res = conn.query("SELECT * FROM menu_items")
    conn.close()
    return res

def addNewItem(item_info):
    conn = db.DBConnection()
    item_id = item_info['item_id']
    item_name = item_info['item_name']
    # TODO: write SQL to all everything else into the DB
    conn.query(f"INSERT INTO menu_items (item_id, item_name) VALUES ({item_id}, '{item_name}')", False)
    conn.close()


def deleteItem(item_name):
    conn = db.DBConnection()
    conn.query(f"DELETE FROM menu_items WHERE item_name='{item_name}'", False)
    conn.close()