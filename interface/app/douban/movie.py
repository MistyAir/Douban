import pymysql
from .settings import DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE

class Movie:
    """
    movie class
    """

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
        sql = 'SELECT COUNT(*) FROM movie'
        self.cursor.execute(sql)
        return self.cursor.fetchone()[0]
    
    def distribution_by_country(self):
        """
        distribution by country
        """
        sql = 'SELECT country, COUNT(*) as count FROM movie GROUP BY country'
        self.cursor.execute(sql)
        x = self.cursor.fetchall()
        x = [dict(zip(['country', 'count'], i)) for i in x]
        ret = {}
        for i in x:
            i_split = i['country'].split(' ')
            for j in i_split:
                ret.setdefault(j, 0)
                ret[j] += i['count']
        dele = []
        others = 0
        for i in ret:
            if ret[i] < 10:
                others += ret[i]
                dele.append(i)
        for i in dele:
            del ret[i]
        ret.setdefault('其他', others)
        return ret
    
    def distribution_by_type(self):
        """
        distribution by type
        """
        sql = 'SELECT category, COUNT(*) FROM movie GROUP BY category'
        self.cursor.execute(sql)
        x = self.cursor.fetchall()
        x = [dict(zip(['type', 'count'], i)) for i in x]
        ret = {}
        for i in x:
            i_split = i['type'].split(' ')
            for j in i_split:
                ret.setdefault(j, 0)
                ret[j] += i['count']
        dele = []
        others = 0
        for i in ret:
            if ret[i] < 10:
                others += ret[i]
                dele.append(i)
        for i in dele:
            del ret[i]
        ret.setdefault('其他', others)
        return ret
    