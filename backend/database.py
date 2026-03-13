from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from models.user import User
import os
from dotenv import load_dotenv

load_dotenv()

async def init_db():
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db = client[os.getenv("DB_NAME")]
    await init_beanie(database=db, document_models=[User])