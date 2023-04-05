from flask import request, jsonify
from app import app
import hashlib
#import psycopg2;

@app.route('/login', methods=['POST'])
def attemptLogin():
    #Grab employeeID and pin from request form data
    id = int(request.form['employeeID'])
    pin = int(request.form['employeePIN'])
    md5 = hashlib.md5()
    hashedPIN = md5.update(pin.encode('utf-8')).hexdigest()

    # Connect to database
    #TODO: Create conn
    try:
        # Create a cursor object
        cursor = conn.cursor()
        # Running a query looks for a entered id in the employee table
        sqlStmt = "SELECT * FROM employees WHERE employee_id=%s"
        # Execute query with id parameter
        cursor.execute(sqlStmt, (id,))
        result = cursor.fetchone()

        # If statement checking if the ID and pins are a match
        if result['employeeID'] == id and result['employee_pin'] == hashedPIN:
            if result['access_mgmt']:
                isManager = True
                print("Log-in Success! Access Permission: Manager")
            else:
                isManager = False
                print("Log-in Success! Access Permission: Barista")

            #if isManager:
                #TODO: Switch To Manager View

            #else:
                #TODO: Switch to Server View

        # Invalid login
        else:
            print("Could not find user. Check username or PIN.")

    except Exception as e:
        print(e)
        raise e
    #finally:
        #close connection ex: conn.close()