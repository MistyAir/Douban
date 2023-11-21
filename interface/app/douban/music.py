import pymysql
from .settings import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

class Music:

    def __init__(self) -> None:
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
        sql = 'SELECT COUNT(*) FROM music'
        self.cursor.execute(sql)
        return self.cursor.fetchone()[0]
    
    def distribution_by_style(self):
        """
        distribution by style
        """
        sql = 'SELECT style, COUNT(*) FROM music GROUP BY style'
        self.cursor.execute(sql)
        x = self.cursor.fetchall()
        x = [dict(zip(['style', 'count'], i)) for i in x]
        ret = {}
        for i in x:
            ret.setdefault(i[0], i[1])
        return ret
    