from typing import Union
from fastapi import FastAPI
from controllers import users

app = FastAPI()

app.include_router(users.router)

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