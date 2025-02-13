import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # MongoDB Atlas connection string
    MONGO_URI = os.getenv("MONGO_URI")

    # Debug Mode
    DEBUG = os.getenv("DEBUG", "False").lower() == "true"
