from fastapi import APIRouter, HTTPException, status, Response, Request
from datetime import datetime, timedelta, timezone
from typing import Union
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from jose import JOSEError, jwt
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from models.user import User
from models.anime_list import AnimeList
from .users import check_token, get_one_user

router = APIRouter()

SECRET_KEY = "58d2ea9c3cfcdf9cb6d7d3e23be9528434ca0059eb99c17fda0911427020dd85"
ALGORITHM = "HS256"

class AnimeWatchlist(BaseModel):
    anime_list_name: str
    user_id: int 

#CREATE
@router.post('/api/createanimelist')
async def create_anime_list(anime_list: AnimeWatchlist, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        user = jwt.decode(request.cookies.get('cookie'), SECRET_KEY, algorithms="HS256");
        print("WATCHLIST", user['username'])
        user_data = User.get_one_user(user['username'])
        # print(user_data)
        # print(anime_list.anime_list_name)
        # anime_list_details = {
        #     'anime_list_name': anime_list.anime_list_name,
        #     'anime_list_description': anime_list.anime_list_description,
        #     'user_id': user_data[0]['id']}
        # print(anime_list_details)
        anime_list.user_id = user_data[0]['id']
        # print(anime_list.user_id)
        # print('LIST', anime_list)
        AnimeList.create_anime_list(anime_list)
        new_anime_list = AnimeList.get_one_users_list(anime_list.user_id)
        return new_anime_list
    else: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")

#READ
@router.get("/api/animelist")
async def get_users_anime_list(request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        username = jwt.decode(request.cookies.get('cookie'), SECRET_KEY, algorithms="HS256");
        user = User.get_one_user(username['username'])
        users_anime_lists = AnimeList.get_one_users_list(user[0]['id']);
        return users_anime_lists
    else: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")

# READ ONE LISTS CONTENTS
@router.get("/api/animelist/{list_id}")
async def get_anime_list_contents(list_id: int, request: Request, response: Response):
    if check_token(request.cookies.get('cookie')) == True:
        username = jwt.decode(request.cookies.get('cookie'), SECRET_KEY, algorithms="HS256");
        user = User.get_one_user(username['username'])

        query_data = { "id": list_id, "user_id": user[0]['id']} 

        data = AnimeList.get_one_list_contents(query_data)
        return data
    else: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")


#UPDATE
@router.get('/api/EDIanimelist')
async def edit_anime_list():
    return

#DELETE
@router.get('/api/animelist')
async def delete_anime_list():
    return