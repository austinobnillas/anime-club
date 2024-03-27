from typing import Union
from fastapi import FastAPI
from controllers import users

app = FastAPI()

app.include_router(users.router)

