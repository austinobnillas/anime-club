from fastapi import APIRouter, HTTPException, status, Response, Request
from datetime import datetime, timedelta, timezone
from typing import Union
from fastapi.encoders import jsonable_encoder
from passlib.context import CryptContext
from jose import JOSEError, jwt
from pydantic import BaseModel
from fastapi.responses import JSONResponse
import re
EMAIL_REGEX = re.compile(r'^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]+$')
from models.user import User
router = APIRouter()

SECRET_KEY = "58d2ea9c3cfcdf9cb6d7d3e23be9528434ca0059eb99c17fda0911427020dd85"
ALGORITHM = "HS256"

class UnregisteredUser(BaseModel):
    username: str
    email: str
    password: str
    confirm_password: str

class RegisteredUser(BaseModel):
    username: str
    password: str

#for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

#jwt creatiom 
def create_token(payload):
    token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
    return token

def check_token(cookie):
    isToken = False;
    if not cookie:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")
    else:
        isToken = True
    return isToken 

#backend validations, will most likely remove this in the future in favor of pydantic validations
def register_validations(user):
    validation_errors={}
    if len(user.username) < 3:
        validation_errors["username_length"] = "Username too short, must be more than 3 characters"
    if len(user.password) < 3:
        validation_errors["password_length"] = "Password too short, must be more than 3 characters"
    if user.password !=  user.confirm_password: 
        validation_errors["confirm_password"] = "Passwords do not match"
    if not EMAIL_REGEX.match(user.email):
        validation_errors["email_errors"] = "Please enter a valid email address"
    if User.get_one_user(user):
        validation_errors["username_exist"] = "Username already in use"
    return validation_errors

#register
@router.post('/api/register')
async def register(user: UnregisteredUser, response: Response):
    #call function for data validation
    data_validation = register_validations(user)
    #return the errors if there is bad data
    if data_validation:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=data_validation)
    #no validation errors and then 
    else: #hash password before storing / call function to store user in the db
        user.password = pwd_context.hash(user.password)
        result = User.register(user)
        if result == False: #exception if something goes wrong with db
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Something went wrong")
        else: #create cookie
            cookie = create_token({"username": user.username})
            response.set_cookie(key="cookie", value=cookie)
            #temporary message
            return {'msg': "logged in", 'user': user}
#login
@router.post('/api/login')
async def login(user: RegisteredUser, response: Response):
    #retried user from db
    user_account = User.login(user)
    #validate correct username, case sensitive
    if not user_account:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Username/Password")
    #validate hashed password and entered password
    if not pwd_context.verify(user.password, user_account[0]['password']):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid Username/Password")
    #create cookie if no errors
    cookie = create_token({"username": user.username})
    response.set_cookie(key="cookie", value=cookie)
    return {'msg': "logged in", 'user': user}

#logout
@router.post('/api/logout')
def logout(response: Response):
    # response.delete_cookie(key="cookie")
    response.delete_cookie(key="cookie")
    return {'msg': 'logged out'}

#get user
@router.get('/api/getuser')
async def get_one_user(request: Request):
    if check_token(request.cookies.get('cookie')) == True:
        username = jwt.decode(request.cookies.get('cookie'), SECRET_KEY, algorithms="HS256");
        print(username['username'])
        
        user = User.get_one_user(username['username'])
        return user
    else: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="token missing")
    
    
