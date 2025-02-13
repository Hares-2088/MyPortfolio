import motor.motor_asyncio
from beanie import init_beanie
from models import Project, Comment
from config import Config

# Connect to MongoDB Atlas
client = motor.motor_asyncio.AsyncIOMotorClient(Config.MONGO_URI)
database = client["portfolio_db"]

async def init_db():
    """Initialize Beanie ODM with the Project and Comment collections and debug the connection."""
    await init_beanie(database, document_models=[Project, Comment])

    # Debug: Print data immediately after initializing Beanie
    projects = await Project.all().to_list()
    comments = await Comment.all().to_list()
    print("DEBUG AFTER INIT_DB: Retrieved projects ->", projects)
    print("DEBUG AFTER INIT_DB: Retrieved comments ->", comments)