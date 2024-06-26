from database import MySQLConnection
db = "AnimeClub"

class AnimeList(): 
    def __init__(self, data):
        self.id = data.id
        self.user_id = data.user_id
        self.anime_list_name = data.anime_list_name
        self.anime_list_description = data.anime_list_description
        self.created_at = data.created_at
        self.updated_at = data.updated_at

    #create 
    @classmethod
    def create_anime_list(cls, data):
        query = f"""
            INSERT INTO anime_list (list_name, user_id)
            VALUES ("{data.anime_list_name}", {data.user_id});
        """
        result = MySQLConnection(db).query_db(query)
        return result

    #read user's lists
    @classmethod
    def get_one_users_list(cls, data):
        print(data)
        query = f"""
            SELECT * from anime_list
            WHERE user_id = "{data}";
        """
        result = MySQLConnection(db).query_db(query)
        return result

    #read one list
    @classmethod
    def get_one_list_contents(cls, data):
        query = f"""
            SELECT * FROM anime
            JOIN anime_list on anime_list.id = anime.anime_list_id
            WHERE anime_list_id = {data['id']} && user_id = {data['user_id']};
        """
        result = MySQLConnection(db).query_db(query)
        return result
    #update
    @classmethod
    def edit_anime_list(cls, data):
        query = f"""
            UPDATE anime_list
            SET list_name = "{data.anime_list_name}"
            WHERE id = {data.list_id}
        """
        result = MySQLConnection(db).query_db(query)
        return result
    #delete
    @classmethod
    def delete_anime_list(cls, data):
        query = f"""
            DELETE * from anime_list
            WHERE id = {data.id}
        """
        result = MySQLConnection(db).query_db(query)
        return result
