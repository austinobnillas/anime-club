from database import MySQLConnection
db = "AnimeClub"

class User(): 
    def __init__(self, data):
        # self.id = data['id']
        # self.username = data['username']
        # self.email = data['email']
        # self.password = data['password']
        # self.created_at = data['created_at']
        # self.updated_at = data['updated_at']
        self.id = data.id
        self.username = data.username
        self.email = data.email
        self.password = data.password
        self.created_at = data.created_at
        self.updated_at = data.updated_at

    @classmethod
    def register(cls, data): 
        query = f"""
            INSERT INTO users (username, email, password)
            VALUES ("{data.username}", "{data.email}", "{data.password}");
        """
        result = MySQLConnection(db).query_db(query)
        return result
    
    @classmethod
    def login(cls, data):
        query = f"""
            SELECT * FROM users
            WHERE BINARY username LIKE "{data.username}";
        """
        result = MySQLConnection(db).query_db(query)
        return result

# this method is usually used for testing for now
    @classmethod
    def get_one_user(cls, data):
        query = f"""
            SELECT username FROM users 
            WHERE username = "{data}";
        """
        result = MySQLConnection(db).query_db(query)
        print(result)
        return result