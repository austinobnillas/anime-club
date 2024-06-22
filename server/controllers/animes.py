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
import os
from dotenv import load_dotenv
load_dotenv()

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

class AnimeModel(BaseModel):
    anime_name: str
    anime_year: int
    anime_mal_id: int 
    anime_rating: str
    anime_score: float
    anime_season: str
    anime_list_id: int
    anime_img_url: str

@router.post("/api/{anime_list_id}/addanime/{anime_id}")
async def add_anime(anime_list_id: int, anime_id: int, anime: AnimeModel, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        anime.anime_list_id = anime_list_id;
        anime.anime_mal_id = anime_id;
        #check if this anime is already in the db
        if Anime.check_anime(anime):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You've already added this anime to this list")
        print(anime)
        Anime.add_anime(anime)
        return {"msg": "Anime successfully added!"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")

@router.delete("/api/deleteanime/{anime_id}")
async def delete_anime(anime_id: int, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        results = Anime.delete_anime(anime_id)
        
        return results
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")