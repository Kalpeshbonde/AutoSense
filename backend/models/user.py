from beanie import Document
from pydantic import EmailStr
from datetime import datetime
from typing import Optional, List

class User(Document):
    name: str
    email: EmailStr
    password: str
    car_name: Optional[str] = None
    car_company: Optional[str] = None
    fleet_size: Optional[int] = None
    primary_use_case: List[str] = []
    newsletter: bool = False
    created_at: datetime = datetime.utcnow()

    class Settings:
        name = "users"