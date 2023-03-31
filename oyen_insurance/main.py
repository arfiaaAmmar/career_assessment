from fastapi import FastAPI, Depends
from fastapi_sqlalchemy import SQLAlchemySessionMiddleware, sqlalchemy_session
from pydantic import Basemodel
from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

app = FastAPI()

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

class UserCreate(Basemodel): 
    username: str
    password: str

class UserLogin(Basemodel):
    username: str
    password: str

app.add_middleware(SQLAlchemySessionMiddleware)

@app.post("/register")
async def register_user(user: UserCreate, session: Session = Depends(sqlalchemy_session)):
    db_user = session.query(User).filter(User.username == user.username).first()
    if db_user:
        return {"success": False, "message": "Username already taken"}
    db_user = User(username=user.username, password=user.password)
    session.add(db_user)
    session.commit()
    return {"success": True}

@app.post("/login")
async def login_user(user: UserLogin, session: Session = Depends(sqlalchemy_session)):
    db_user = session.query(User).filter(User.username == user.username).first()
    if not db_user:
        return {"success": False, "message": "Invalid username or password"}
    if db_user.password != user.password:
        return {"success": False, "message": "Invalid username or password"}
    return {"success": True, "username": db_user.username}