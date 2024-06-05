from fastapi import APIRouter, HTTPException, status, Response, Request
from datetime import datetime, timedelta, timezone
from typing import Union
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from jose import JOSEError, jwt
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from models.user import User
from models.anime import Anime
from models.anime_list import AnimeList
from .users import check_token, get_one_user

router = APIRouter()

SECRET_KEY = "58d2ea9c3cfcdf9cb6d7d3e23be9528434ca0059eb99c17fda0911427020dd85"
ALGORITHM = "HS256"

class AnimeModel(BaseModel):
    anime_name: str
    anime_year: int
    anime_mal_id: int 
    anime_rating: str
    anime_score: float
    anime_season: str
    anime_list_id: int

@router.post("/api/{anime_list_id}/addanime/{anime_id}")
async def add_anime(anime_list_id: int, anime_id: int, anime: AnimeModel, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        anime.anime_list_id = anime_list_id;
        anime.anime_mal_id = anime_id;
        if Anime.check_anime(anime):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You've already added this anime to this list")
        print(anime)
        Anime.add_anime(anime)
        new_anime = Anime.get_anime(anime)
        
        return new_anime
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")

@router.post("/api/{anime_list_id}/deleteanime/{anime_id}/{id}")
async def delete_anime(id: int, anime_list_id: int, anime_id: int, anime: AnimeModel, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        anime.anime_list_id = anime_list_id;
        anime.anime_mal_id = anime_id;
        Anime.delete_anime(id)


        new_anime = Anime.get_anime(anime)
        
        return new_anime
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")