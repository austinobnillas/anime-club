from database import MySQLConnection
db = "AnimeClub"

class Anime(): 
    def __init__(self, data):
        self.id = data.id
        self.anime_name = data.anime_name
        self.anime_year = data.anime_year
        self.anime_mal_id = data.anime_mal_id
        self.anime_rating = data.anime_rating
        self.anime_score = data.anime_score
        self.anime_season = data.anime_season
        self.anime_list_id = data.anime_list_id
        self.anime_img_url = data.anime_img_url
        self.created_at = data.created_at
        self.updated_at = data.updated_at

    @classmethod
    def add_anime(cls, data):
        query = f"""
            INSERT INTO anime (anime_name, year, mal_id, rating, score, season, anime_list_id, img_url)
            VALUES ("{data.anime_name}", "{data.anime_year}", "{data.anime_mal_id}", "{data.anime_rating}", "{data.anime_score}", "{data.anime_season}", "{data.anime_list_id}", "{data.anime_img_url}")
        """
        result = MySQLConnection(db).query_db(query)
        return result

    @classmethod
    def get_anime(cls, data):
        query = f"""
            SELECT * FROM anime
            WHERE anime_list_id = {data.anime_list_id};
        """
        result = MySQLConnection(db).query_db(query)
        return result

    @classmethod
    def check_anime(cls, data):
        query = f"""
            SELECT * FROM anime
            JOIN anime_list on anime_list.id = anime.anime_list_id
            WHERE anime.mal_id = {data.anime_mal_id} && anime_list_id = {data.anime_list_id};
        """
        result = MySQLConnection(db).query_db(query)
        return result
    
    @classmethod
    def delete_anime(cls, data):
        query = f"""
            DELETE FROM anime
            WHERE id = {data};
        """
        result = MySQLConnection(db).query_db(query)
        return result
    
    #for deleting all anime in list whne list is being deleted
    @classmethod
    def delete_all_anime_in_list(cls, data):
        query = f"""
            DELETE * FROM anime
            WHERE anime_list_id = {data};
        """
        result = MySQLConnection(db).query_db(query)
        return result