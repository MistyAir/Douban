import pymysql
from .settings import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

class Book:

    def __init__(self):
        self.conn = pymysql.connect(host=DB_HOST, user=DB_USERNAME, password=DB_PASSWORD, database=DB_DATABASE)
        self.cursor = self.conn.cursor()
        print('connect success')

    def __del__(self):
        self.cursor.close()
        self.conn.close()
        print('connect close')

    def totalCount(self):
        """
        total count
        """
        sql = 'SELECT COUNT(*) FROM book'
        self.cursor.execute(sql)
        return self.cursor.fetchone()[0]
    
