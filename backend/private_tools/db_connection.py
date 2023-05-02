import psycopg2
from psycopg2 import Error
import csv

class DBConnection():
    def __init__(self):
        try:
            db = {}
            with open("./private_tools/db_access.csv", 'r') as datfile:
                reader = list(csv.reader(datfile))
                for i in reader:
                    db[i[0]] = i[1]
            self.conn = psycopg2.connect(host=db["host"], dbname=db["dbname"], user=db["user"], password=db["password"])
            self.cur = self.conn.cursor()
        except (Exception, Error) as error:
            print("Error while connecting to PostgreSQL", error)

    #OLD VER WITHOUT PARAMS
    # def query(self, query, allowFetch = True):
    #     self.cur.execute(query)
    #     self.conn.commit()
    #     if allowFetch:
    #         return self.cur.fetchall()
    #     return 1

    def query(self, query, allowFetch = True, params=None):
        if params is not None:
            self.cur.execute(query, params)
        else:
            self.cur.execute(query)
        self.conn.commit()
        if allowFetch:
            return self.cur.fetchall()
        return 1
    def close(self):
        self.cur.close()
        self.conn.close()

