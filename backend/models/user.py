from beanie import Document
from pydantic import EmailStr
from datetime import datetime


class User(Document):
    name: str
    email: EmailStr
    password: str  # hashed
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "users"  # MongoDB collection name