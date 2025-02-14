from fastapi import FastAPI
from contextlib import asynccontextmanager
from routes import project_router, comment_router
from database import init_db
from config import Config
import asyncio
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

print("DEBUG: Loaded MONGO_URI ->", os.getenv("MONGO_URI"))  # Debugging step

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Ensure the database is initialized before FastAPI starts handling requests."""
    await init_db()

    # Wait briefly before accepting requests (debugging step)
    await asyncio.sleep(2)

    yield

app = FastAPI(debug=Config.DEBUG, lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  # Replace with your Vue app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include project routes
app.include_router(project_router, prefix="/projects", tags=["Projects"])
app.include_router(comment_router, prefix="/comments", tags=["Comments"])

@app.get("/")
def home():
    return {"message": "Welcome to Adem's Portfolio API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
