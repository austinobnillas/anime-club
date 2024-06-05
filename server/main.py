from typing import Union
from fastapi import FastAPI
from controllers import users, anime_lists, animes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
    )

app.include_router(users.router)
app.include_router(anime_lists.router)
app.include_router(animes.router)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.get("/test/s={search_method}/q={search_term}")
def testing(search_method: Union[str, None] = None, search_term: Union[str, None] = None):
    return {"method": search_method, 
            "term": search_term}